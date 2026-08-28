import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  secretBidAmount(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
}

export type ImpureCircuits<PS> = {
  initializeTender(context: __compactRuntime.CircuitContext<PS>,
                   reserve_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  submitSealedBid(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  submitDisclosedBid(context: __compactRuntime.CircuitContext<PS>, bid_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  closeTender(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  resetTender(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type ProvableCircuits<PS> = {
  initializeTender(context: __compactRuntime.CircuitContext<PS>,
                   reserve_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  submitSealedBid(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  submitDisclosedBid(context: __compactRuntime.CircuitContext<PS>, bid_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  closeTender(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  resetTender(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  initializeTender(context: __compactRuntime.CircuitContext<PS>,
                   reserve_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  submitSealedBid(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  submitDisclosedBid(context: __compactRuntime.CircuitContext<PS>, bid_0: bigint): Promise<__compactRuntime.CircuitResults<PS, []>>;
  closeTender(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
  resetTender(context: __compactRuntime.CircuitContext<PS>): Promise<__compactRuntime.CircuitResults<PS, []>>;
}

export type Ledger = {
  readonly reservePrice: bigint;
  readonly bidCount: bigint;
  readonly highestDisclosedBid: bigint;
  readonly isOpen: boolean;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): Promise<__compactRuntime.ConstructorResult<PS>>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
export declare const expectedVk: Record<string, string>;
