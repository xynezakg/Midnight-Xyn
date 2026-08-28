import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  FileText,
  Clock,
  DollarSign,
  PlusCircle
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG, formatAddress } from '../utils/contract';

interface SealedBiddingProps {
  contractAddress: string;
  bidCount: bigint;
  reservePrice: bigint;
  isOpen: boolean;
  isConnected: boolean;
  isProving: boolean;
  txHash: string | null;
  error: string | null;
  onExecuteCircuit: (
    circuitName: 'initializeTender' | 'submitSealedBid' | 'submitDisclosedBid' | 'closeTender' | 'resetTender',
    inputValue: number
  ) => void;
}

export const SealedBidding: React.FC<SealedBiddingProps> = ({
  contractAddress,
  bidCount,
  reservePrice,
  isOpen,
  isConnected,
  isProving,
  txHash,
  error,
  onExecuteCircuit,
}) => {
  const [inputValue, setInputValue] = useState<number>(125000);
  const [selectedTender, setSelectedTender] = useState<string>('TND-2026-081');

  const tenders = [
    {
      id: 'TND-2026-081',
      title: 'Global Cloud Infrastructure & Edge Servers',
      buyer: 'Apex Cloud Systems',
      reservePrice: '$100,000 USD',
      reserveVal: 100000,
      deadline: '23h 45m',
      category: 'Enterprise IT',
      verifiedBids: Number(bidCount),
    },
    {
      id: 'TND-2026-094',
      title: 'Municipal Clean Energy Microgrid Inverters',
      buyer: 'Metropolitan Energy Board',
      reservePrice: '$420,000 USD',
      reserveVal: 420000,
      deadline: '48h 10m',
      category: 'CleanTech',
      verifiedBids: 12,
    },
    {
      id: 'TND-2026-102',
      title: 'Zero-Trust Cybersecurity SOC Audit 2026',
      buyer: 'FinGuard International',
      reservePrice: '$85,000 USD',
      reserveVal: 85000,
      deadline: '3d 12h',
      category: 'Security',
      verifiedBids: 7,
    },
  ];

  const activeTenderData = tenders.find(t => t.id === selectedTender) || tenders[0];

  const handleWitnessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue > 0) {
      onExecuteCircuit('submitSealedBid', inputValue);
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Tenders Selector */}
      <div className="clay-card p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Active Sealed-Bid Tenders
            </h3>
            <p className="text-xs text-gray-400">Select an enterprise procurement tender to submit your confidential bid proposal.</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            3 Active Procurements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              onClick={() => {
                setSelectedTender(tender.id);
                setInputValue(tender.reserveVal + 25000);
              }}
              className={`p-4 rounded-2xl cursor-pointer transition-all border text-left ${
                selectedTender === tender.id
                  ? 'clay-card-interactive border-indigo-500/50 ring-2 ring-indigo-500/20 bg-indigo-950/20'
                  : 'bg-gray-950/50 border-gray-800/80 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 text-gray-400">
                <span>{tender.id}</span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Clock className="w-3 h-3" /> {tender.deadline}
                </span>
              </div>
              <h4 className="font-bold text-sm text-gray-200 line-clamp-1 mb-1">{tender.title}</h4>
              <p className="text-xs text-gray-400 mb-3">{tender.buyer}</p>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-800/60 text-xs">
                <span className="text-gray-400">Reserve: <strong className="text-gray-200">{tender.reservePrice}</strong></span>
                <span className="text-indigo-300 font-mono font-semibold">{tender.verifiedBids} Bids</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Execution Terminal */}
      <div className="clay-card p-6 md:p-8 border border-gray-800 space-y-6">
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold text-gray-100">Zero-Knowledge Sealed Bidding</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Compact ZK v0.33
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Target: <strong className="text-gray-200">{activeTenderData.title}</strong> ({activeTenderData.id})
            </p>
          </div>

          <div className="bg-gray-950/80 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              Preprod Contract
            </span>
            <span className="font-mono text-xs text-indigo-300 font-semibold" title={contractAddress}>
              {formatAddress(contractAddress, 10, 8)}
            </span>
          </div>
        </div>

        {/* Public Ledger State Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="clay-card p-4 border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Verified Public Bids
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">
                {bidCount.toString()}
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> On-Chain
              </span>
            </div>
          </div>

          <div className="clay-card p-4 border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Min Reserve Price
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-indigo-200">
                {activeTenderData.reservePrice}
              </span>
            </div>
          </div>

          <div className="clay-card p-4 border border-gray-800">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Bidder Privacy Mode
            </span>
            <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold mt-1">
              <Lock className="w-4 h-4" /> 100% Shielded Witness
            </div>
          </div>
        </div>

        {/* Mandatory Requirement: Privacy Label */}
        <div className="clay-badge-shield p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-2">
              Proved without revealing your input
            </h4>
            <p className="text-xs text-gray-300 mt-0.5">
              Your secret proposal delta & bid price remain strictly confidential in your browser witness memory. Only a cryptographic validity proof is submitted to Midnight.
            </p>
          </div>
        </div>

        {/* Bidding Form */}
        <form onSubmit={handleWitnessSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Confidential Supplier Bid Amount (USD)
              </label>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Private Witness Input
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min="100000"
                max="10000000"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
                disabled={!isConnected || isProving}
                className="clay-input w-full rounded-xl px-4 py-3.5 text-gray-100 font-mono text-sm focus:outline-none disabled:opacity-50"
                placeholder="Enter confidential bid value..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                ZK Shielded
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5">
              This numerical value represents your confidential procurement offer. It will <strong>never</strong> be logged on-chain.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={!isConnected || isProving || inputValue <= 0}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl clay-button-primary text-white font-bold text-sm flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProving ? (
                <>
                  <Cpu className="w-5 h-5 animate-spin" />
                  Generating Client ZK Proof...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Submit Zero-Knowledge Sealed Bid
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onExecuteCircuit('initializeTender', 100000)}
              disabled={!isConnected || isProving}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl clay-button-secondary text-gray-300 font-semibold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              Initialize Tender
            </button>

            <button
              type="button"
              onClick={() => onExecuteCircuit('resetTender', 0)}
              disabled={!isConnected || isProving}
              className="w-full sm:w-auto py-3.5 px-4 rounded-xl clay-button-secondary text-gray-400 hover:text-gray-200 font-semibold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </form>

        {/* Proving Status Overlay */}
        {isProving && (
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center gap-3 animate-pulse">
            <Cpu className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-indigo-200 block">
                Executing Local Client zk-SNARK Prover...
              </span>
              <span className="text-gray-400">
                Synthesizing arithmetic constraints and creating zero-knowledge transaction witness.
              </span>
            </div>
          </div>
        )}

        {/* Transaction Submission Result */}
        {txHash && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              Transaction Verified & Included on Midnight Network!
            </div>

            <div className="bg-gray-950/70 p-3 rounded-xl border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono text-xs text-gray-300 truncate" title={txHash}>
                Tx Hash: {txHash}
              </span>
              <a
                href={BIDVEIL_CONTRACT_CONFIG.explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0"
              >
                Explorer <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-emerald-300/90 italic">
              ✓ Proved without revealing your input — On-chain observers only verify the cryptographic proof and updated public state.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};
