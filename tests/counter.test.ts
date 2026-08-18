import { describe, it } from 'node:test';
import strictAssert from 'node:assert/strict';
import { createCircuitContext, dummyContractAddress, emptyZswapLocalState } from '@midnight-ntwrk/compact-runtime';
import { Contract, ledger } from '../managed/counter/contract/index.js';

function createDummyConstructorContext() {
  return {
    initialPrivateState: {},
    initialZswapLocalState: emptyZswapLocalState(),
  };
}

describe('Bidveil Counter Contract — Substantive Test Suite', () => {
  it('1. Initialization: initializes ledger counter to zero with proper context structure', async () => {
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, 0n],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    const circuitCtx = createCircuitContext(
      'incrementBy',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    const initialLedger = ledger(circuitCtx.callContext.currentQueryContext.state);
    
    strictAssert.strictEqual(typeof initialLedger.counter, 'bigint', 'Ledger counter must be of BigInt type');
    strictAssert.strictEqual(initialLedger.counter, 0n, 'Initial counter value must start at exactly 0n');
    strictAssert.deepStrictEqual(Object.keys(initialLedger), ['counter'], 'Public ledger must only contain the counter field');
  });

  it('2. Circuit Logic: incrementBy updates ledger counter with substantive assertions', async () => {
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, 0n],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    const circuitCtx = createCircuitContext(
      'incrementBy',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    // Initial check
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 0n);

    // Step 1: incrementBy(25n)
    const step1 = await contract.circuits.incrementBy(circuitCtx, 25n);
    const ledgerStep1 = ledger(step1.context.callContext.currentQueryContext.state);
    strictAssert.strictEqual(ledgerStep1.counter, 25n, 'Counter must be 25n after first increment');

    // Step 2: incrementBy(75n) -> 100n
    const step2 = await contract.circuits.incrementBy(step1.context, 75n);
    const ledgerStep2 = ledger(step2.context.callContext.currentQueryContext.state);
    strictAssert.strictEqual(ledgerStep2.counter, 100n, 'Counter must be 100n after second increment');
  });

  it('3. Private Witness Circuit: incrementWithPrivateWitness executes local witness computation', async () => {
    let currentSecret = 50n;
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, currentSecret],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      'incrementWithPrivateWitness',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    // Execute with secret 50n
    let res = await contract.circuits.incrementWithPrivateWitness(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 50n);

    // Update secret witness to 150n and re-execute
    currentSecret = 150n;
    res = await contract.circuits.incrementWithPrivateWitness(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 200n);
  });

  it('4. State Transitions: comprehensive sequential transitions & reset circuit verification', async () => {
    let secretVal = 30n;
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, secretVal],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      'incrementBy',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    // 1. Initial State = 0n
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 0n);

    // 2. Public increment (+20n) -> 20n
    let res = await contract.circuits.incrementBy(circuitCtx, 20n);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 20n);

    // 3. Private witness increment (+30n) -> 50n
    res = await contract.circuits.incrementWithPrivateWitness(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 50n);

    // 4. Reset circuit -> 0n
    res = await contract.circuits.reset(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 0n, 'Counter must reset to 0n');

    // 5. Post-reset increment (+10n) -> 10n
    res = await contract.circuits.incrementBy(circuitCtx, 10n);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.callContext.currentQueryContext.state).counter, 10n, 'Counter must resume incrementing after reset');
  });

  it('5. Privacy Model & Witness Isolation: verifies private witness is strictly isolated from public ledger', async () => {
    const confidentialAmount = 999_999n;
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, confidentialAmount],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = await contract.initialState(constructorCtx);

    const circuitCtx = createCircuitContext(
      'incrementWithPrivateWitness',
      dummyContractAddress(),
      emptyZswapLocalState(),
      stateResult.currentContractState,
      stateResult.currentPrivateState
    );

    const res = await contract.circuits.incrementWithPrivateWitness(circuitCtx);
    const publicLedgerState = ledger(res.context.callContext.currentQueryContext.state);

    // Verify counter reflects disclosed delta
    strictAssert.strictEqual(publicLedgerState.counter, confidentialAmount);

    // Substantive privacy isolation assertions:
    strictAssert.deepStrictEqual(Object.keys(publicLedgerState), ['counter']);
    strictAssert.strictEqual((publicLedgerState as any).secretDelta, undefined);
    strictAssert.strictEqual((publicLedgerState as any).privateState, undefined);
    strictAssert.strictEqual((publicLedgerState as any).witnesses, undefined);
  });
});
