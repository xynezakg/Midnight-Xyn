import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  FileCheck2, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  BarChart3, 
  Database,
  Building2,
  Users,
  EyeOff,
  Zap,
  Globe
} from 'lucide-react';

interface LandingProps {
  onLaunchApp: () => void;
}

export const LandingPage: React.FC<LandingProps> = ({ onLaunchApp }) => {
  return (
    <div className="space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="relative text-center space-y-6 pt-8 pb-12 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-card text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Midnight Network Level 3 • Zero-Knowledge SaaS
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Next-Gen <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Sealed-Bid Procurement</span> Powered by Zero Knowledge
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Bidveil empowers enterprises, public institutions, and high-value buyers to conduct confidential tenders. Vendors prove their compliance and submit secret bids without leaking proprietary margins.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onLaunchApp}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl clay-button-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-2xl"
          >
            Launch Bidding Terminal <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl clay-button-secondary text-gray-300 font-semibold text-sm flex items-center justify-center gap-2"
          >
            Explore How It Works
          </a>
        </div>

        {/* Hero Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 text-left">
          <div className="clay-card p-4">
            <div className="text-indigo-400 font-bold text-xl mb-0.5">100%</div>
            <div className="text-xs text-gray-300 font-medium">Bid Confidentiality</div>
          </div>
          <div className="clay-card p-4">
            <div className="text-purple-400 font-bold text-xl mb-0.5">&lt; 3s</div>
            <div className="text-xs text-gray-300 font-medium">Client ZK Proving</div>
          </div>
          <div className="clay-card p-4">
            <div className="text-emerald-400 font-bold text-xl mb-0.5">0%</div>
            <div className="text-xs text-gray-300 font-medium">Front-Running Risk</div>
          </div>
          <div className="clay-card p-4">
            <div className="text-pink-400 font-bold text-xl mb-0.5">Compact</div>
            <div className="text-xs text-gray-300 font-medium">Smart Contracts</div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & THE PROBLEM */}
      <section id="about" className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase font-bold text-indigo-400 tracking-widest">About Bidveil</h2>
          <h3 className="text-3xl font-extrabold text-white">Why Traditional Bidding is Broken</h3>
          <p className="text-sm text-gray-400">
            Current procurement portals and public blockchain auctions suffer from severe privacy leaks, bribery vulnerabilities, and front-running.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="clay-card p-6 space-y-4 border border-gray-800">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Web2 Database Leaks</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              In traditional ERPs and procurement portals, centralized database administrators and insiders can peek at vendor pricing before the deadline, enabling bid tampering and kickbacks.
            </p>
          </div>

          <div className="clay-card p-6 space-y-4 border border-gray-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Globe className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Public Chain Exposure</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Transparent networks like Ethereum expose all transactions publicly. Competitors can watch the mempool, copy your pricing structure, or undercut bids by pennies.
            </p>
          </div>

          <div className="clay-card p-6 space-y-4 border border-gray-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">The Midnight Solution</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bidveil leverages Compact zero-knowledge contracts. Bidders prove compliance in-browser while their numerical pricing stays strictly encrypted inside local witness memory.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase font-bold text-indigo-400 tracking-widest">Workflow</h2>
          <h3 className="text-3xl font-extrabold text-white">How Zero-Knowledge Bidding Works</h3>
          <p className="text-sm text-gray-400">
            A frictionless, 4-step cryptographic protocol that guarantees privacy from tender publication to final settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="clay-card p-6 space-y-3 relative">
            <div className="text-xs font-mono text-indigo-400 font-bold">STEP 01</div>
            <h4 className="text-base font-bold text-white">Publish Tender</h4>
            <p className="text-xs text-gray-400">
              The buyer deploys a procurement tender with a public reserve price and bidding deadline recorded on-chain.
            </p>
          </div>

          <div className="clay-card p-6 space-y-3 relative">
            <div className="text-xs font-mono text-purple-400 font-bold">STEP 02</div>
            <h4 className="text-base font-bold text-white">Client ZK Proving</h4>
            <p className="text-xs text-gray-400">
              The supplier enters their confidential bid. The browser runs a local zk-SNARK prover to verify eligibility without sending the price.
            </p>
          </div>

          <div className="clay-card p-6 space-y-3 relative">
            <div className="text-xs font-mono text-emerald-400 font-bold">STEP 03</div>
            <h4 className="text-base font-bold text-white">Broadcast Shielded Bid</h4>
            <p className="text-xs text-gray-400">
              The Lace wallet submits the zero-knowledge transaction to Midnight. Observers only see a verified state transition.
            </p>
          </div>

          <div className="clay-card p-6 space-y-3 relative">
            <div className="text-xs font-mono text-pink-400 font-bold">STEP 04</div>
            <h4 className="text-base font-bold text-white">Verifiable Settlement</h4>
            <p className="text-xs text-gray-400">
              At deadline expiration, the winning proposal is revealed and cryptographically verified, while losing bids remain private forever.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ENTERPRISE USE CASES */}
      <section id="use-cases" className="space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase font-bold text-indigo-400 tracking-widest">Industry Solutions</h2>
          <h3 className="text-3xl font-extrabold text-white">Tailored for High-Stakes Procurement</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="clay-card p-6 space-y-3">
            <Building2 className="w-8 h-8 text-indigo-400" />
            <h4 className="text-base font-bold text-white">Government & Public Tenders</h4>
            <p className="text-xs text-gray-400">
              Eliminate corruption, collusion, and bid rigging with mathematically verifiable public audit trails and private vendor bids.
            </p>
          </div>

          <div className="clay-card p-6 space-y-3">
            <Layers className="w-8 h-8 text-purple-400" />
            <h4 className="text-base font-bold text-white">Supply Chain & Raw Materials</h4>
            <p className="text-xs text-gray-400">
              Procure specialized commodities and parts without alerting competitors to your volume requirements or cost structures.
            </p>
          </div>

          <div className="clay-card p-6 space-y-3">
            <EyeOff className="w-8 h-8 text-emerald-400" />
            <h4 className="text-base font-bold text-white">Confidential Asset Auctions</h4>
            <p className="text-xs text-gray-400">
              Auction high-value intellectual property, real estate, and enterprise hardware with complete price discovery and zero front-running.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="clay-card p-8 md:p-12 text-center space-y-6 max-w-3xl mx-auto border border-indigo-500/30 shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 mb-2">
          <Zap className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-extrabold text-white">Ready to Experience Zero-Knowledge Bidding?</h3>
        <p className="text-sm text-gray-300 max-w-lg mx-auto">
          Connect your Lace Midnight wallet to interact with live Compact smart contracts on the Midnight Preview / Preprod network.
        </p>
        <div>
          <button
            onClick={onLaunchApp}
            className="px-8 py-4 rounded-2xl clay-button-primary text-white font-bold text-sm shadow-xl inline-flex items-center gap-2"
          >
            Launch Bidding Terminal <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
