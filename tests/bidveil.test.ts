import { describe, it } from 'node:test';
import strictAssert from 'node:assert/strict';
import { createCircuitContext, dummyContractAddress, emptyZswapLocalState } from '@midnight-ntwrk/compact-runtime';
import { Contract, ledger } from '../managed/bidveil/contract/index.js';

function createDummyConstructorContext() {
  return {
    initialPrivateState: {},
    initialZswapLocalState: emptyZswapLocalState(),
  };
}

describe('Bidveil Sealed-Bid Procurement Contract — Test Suite', () => {
  it('1. Tender Initialization: initializes tender with reserve price and open status', async () => {
    const witnesses = {
      secretBidAmount: (ctx: any) => [ctx.privateState, 100_000n],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      'initializeTender',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    // Call initializeTender with $100,000 reserve price
    const initRes = await contract.circuits.initializeTender(circuitCtx, 100_000n);
    const pubLedger = ledger(initRes.context.callContext.currentQueryContext.state);

    strictAssert.strictEqual(pubLedger.reservePrice, 100_000n, 'Reserve price must be 100,000n');
    strictAssert.strictEqual(pubLedger.bidCount, 0n, 'Initial bid count must be 0n');
    strictAssert.strictEqual(pubLedger.highestDisclosedBid, 0n, 'Highest disclosed bid must start at 0n');
    strictAssert.strictEqual(pubLedger.isOpen, true, 'Tender status must be open');
  });

  it('2. Confidential Sealed Bidding: verifies valid secret bid without disclosing amount', async () => {
    const confidentialBid = 125_000n; // Above $100k reserve
    const witnesses = {
      secretBidAmount: (ctx: any) => [ctx.privateState, confidentialBid],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      'initializeTender',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    // Initialize with 100,000n reserve
    let res = await contract.circuits.initializeTender(circuitCtx, 100_000n);
    circuitCtx = res.context;

    // Submit sealed bid (local ZK circuit execution)
    res = await contract.circuits.submitSealedBid(circuitCtx);
    const pubLedger = ledger(res.context.callContext.currentQueryContext.state);

    // Substantive Assertions
    strictAssert.strictEqual(pubLedger.bidCount, 1n, 'Verified bid count must increment to 1n');
    strictAssert.strictEqual(pubLedger.reservePrice, 100_000n, 'Reserve price remains intact');

    // PRIVACY VERIFICATION: Prove that the 125,000n secret bid is NOT exposed in public ledger
    strictAssert.deepStrictEqual(
      Object.keys(pubLedger).sort(),
      ['bidCount', 'highestDisclosedBid', 'isOpen', 'reservePrice'].sort(),
      'Public ledger must strictly contain only public tender metadata'
    );
    strictAssert.strictEqual((pubLedger as any).secretBidAmount, undefined);
    strictAssert.strictEqual((pubLedger as any).secretBidSalt, undefined);
  });

  it('3. Constraint Enforcement: rejects secret bid when below reserve price', async () => {
    const underpricedBid = 80_000n; // Below $100k reserve
    const witnesses = {
      secretBidAmount: (ctx: any) => [ctx.privateState, underpricedBid],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      'initializeTender',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    let res = await contract.circuits.initializeTender(circuitCtx, 100_000n);
    circuitCtx = res.context;

    // Submitting underpriced secret bid must throw assertion error in ZK circuit
    await strictAssert.rejects(
      async () => {
        await contract.circuits.submitSealedBid(circuitCtx);
      },
      /Bid amount is below the minimum reserve price/
    );
  });

  it('4. Multi-Vendor Bidding & Lifecycle: sequential bids and tender closing', async () => {
    let currentSupplierBid = 110_000n;
    const witnesses = {
      secretBidAmount: (ctx: any) => [ctx.privateState, currentSupplierBid],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      'initializeTender',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    // Initialize with 100_000n reserve
    let res = await contract.circuits.initializeTender(circuitCtx, 100_000n);
    circuitCtx = res.context;

    // Bidder 1 (110_000n)
    res = await contract.circuits.submitSealedBid(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).bidCount, 1n);

    // Bidder 2 (140_000n)
    currentSupplierBid = 140_000n;
    res = await contract.circuits.submitSealedBid(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).bidCount, 2n);

    // Close tender
    res = await contract.circuits.closeTender(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).isOpen, false);

    // Submitting when closed must fail
    await strictAssert.rejects(
      async () => {
        await contract.circuits.submitSealedBid(circuitCtx);
      },
      /Tender is not open for bidding/
    );
  });

  it('5. Disclosed Settlement & Reset: updates winning metric and resets tender state', async () => {
    const witnesses = {
      secretBidAmount: (ctx: any) => [ctx.privateState, 150_000n],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      'initializeTender',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    let res = await contract.circuits.initializeTender(circuitCtx, 100_000n);
    circuitCtx = res.context;

    // Submit disclosed bid of 175_000n
    res = await contract.circuits.submitDisclosedBid(circuitCtx, 175_000n);
    circuitCtx = res.context;
    let pubLedger = ledger(circuitCtx.callContext.currentQueryContext.state);
    strictAssert.strictEqual(pubLedger.highestDisclosedBid, 175_000n);
    strictAssert.strictEqual(pubLedger.bidCount, 1n);

    // Reset tender
    res = await contract.circuits.resetTender(circuitCtx);
    circuitCtx = res.context;
    pubLedger = ledger(circuitCtx.callContext.currentQueryContext.state);
    strictAssert.strictEqual(pubLedger.reservePrice, 0n);
    strictAssert.strictEqual(pubLedger.bidCount, 0n);
    strictAssert.strictEqual(pubLedger.highestDisclosedBid, 0n);
    strictAssert.strictEqual(pubLedger.isOpen, false);
  });
});
