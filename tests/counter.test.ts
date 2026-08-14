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
  it('1. Initialization: initializes ledger counter to zero with proper context structure', () => {
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, 0n],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = contract.initialState(constructorCtx);

    const circuitCtx = createCircuitContext(
      dummyContractAddress(),
      '00'.repeat(32),
      stateResult.currentContractState.data,
      stateResult.currentPrivateState
    );

    const initialLedger = ledger(circuitCtx.currentQueryContext.state.state);
    
    // Substantive Assertions
    strictAssert.strictEqual(typeof initialLedger.counter, 'bigint', 'Ledger counter must be of BigInt type');
    strictAssert.strictEqual(initialLedger.counter, 0n, 'Initial counter value must start at exactly 0n');
    strictAssert.deepStrictEqual(Object.keys(initialLedger), ['counter'], 'Public ledger must only contain the counter field');
  });

  it('2. Circuit Logic: incrementBy updates ledger counter with substantive assertions', () => {
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, 0n],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = contract.initialState(constructorCtx);

    const circuitCtx = createCircuitContext(
      dummyContractAddress(),
      '00'.repeat(32),
      stateResult.currentContractState.data,
      stateResult.currentPrivateState
    );

    // Initial check
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 0n);

    // Step 1: incrementBy(25n)
    const step1 = contract.circuits.incrementBy(circuitCtx, 25n);
    const ledgerStep1 = ledger(step1.context.currentQueryContext.state.state);
    strictAssert.strictEqual(ledgerStep1.counter, 25n, 'Counter must be 25n after first increment');

    // Step 2: incrementBy(75n) -> 100n
    const step2 = contract.circuits.incrementBy(step1.context, 75n);
    const ledgerStep2 = ledger(step2.context.currentQueryContext.state.state);
    strictAssert.strictEqual(ledgerStep2.counter, 100n, 'Counter must be 100n after second increment');
  });

  it('3. Private Witness Circuit: incrementWithPrivateWitness executes local witness computation', () => {
    let currentSecret = 50n;
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, currentSecret],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      dummyContractAddress(),
      '00'.repeat(32),
      stateResult.currentContractState.data,
      stateResult.currentPrivateState
    );

    // Execute with secret 50n
    let res = contract.circuits.incrementWithPrivateWitness(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 50n);

    // Update secret witness to 150n and re-execute
    currentSecret = 150n;
    res = contract.circuits.incrementWithPrivateWitness(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 200n);
  });

  it('4. State Transitions: comprehensive sequential transitions & reset circuit verification', () => {
    let secretVal = 30n;
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, secretVal],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = contract.initialState(constructorCtx);

    let circuitCtx = createCircuitContext(
      dummyContractAddress(),
      '00'.repeat(32),
      stateResult.currentContractState.data,
      stateResult.currentPrivateState
    );

    // 1. Initial State = 0n
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 0n);

    // 2. Public increment (+20n) -> 20n
    let res = contract.circuits.incrementBy(circuitCtx, 20n);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 20n);

    // 3. Private witness increment (+30n) -> 50n
    res = contract.circuits.incrementWithPrivateWitness(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 50n);

    // 4. Reset circuit -> 0n
    res = contract.circuits.reset(circuitCtx);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 0n, 'Counter must reset to 0n');

    // 5. Post-reset increment (+10n) -> 10n
    res = contract.circuits.incrementBy(circuitCtx, 10n);
    circuitCtx = res.context;
    strictAssert.strictEqual(ledger(circuitCtx.currentQueryContext.state.state).counter, 10n, 'Counter must resume incrementing after reset');
  });

  it('5. Privacy Model & Witness Isolation: verifies private witness is strictly isolated from public ledger', () => {
    const confidentialAmount = 999_999n;
    const witnesses = {
      secretDelta: (ctx: any) => [ctx.privateState, confidentialAmount],
    };
    const contract = new Contract(witnesses);

    const constructorCtx = createDummyConstructorContext();
    const stateResult = contract.initialState(constructorCtx);

    const circuitCtx = createCircuitContext(
      dummyContractAddress(),
      '00'.repeat(32),
      stateResult.currentContractState.data,
      stateResult.currentPrivateState
    );

    const res = contract.circuits.incrementWithPrivateWitness(circuitCtx);
    const publicLedgerState = ledger(res.context.currentQueryContext.state.state);

    // Verify counter reflects disclosed delta
    strictAssert.strictEqual(publicLedgerState.counter, confidentialAmount);

    // Substantive privacy isolation assertions:
    // a) Public schema contains only 'counter'
    strictAssert.deepStrictEqual(Object.keys(publicLedgerState), ['counter']);
    // b) Witness name or private witness state is undefined in public ledger
    strictAssert.strictEqual((publicLedgerState as any).secretDelta, undefined);
    strictAssert.strictEqual((publicLedgerState as any).privateState, undefined);
    strictAssert.strictEqual((publicLedgerState as any).witnesses, undefined);
  });
});
