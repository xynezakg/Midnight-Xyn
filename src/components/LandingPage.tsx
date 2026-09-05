import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  FileCheck2, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Database,
  Building2,
  Users,
  EyeOff,
  Zap,
  Activity,
  Star,
  ExternalLink,
  Sliders,
  Check,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { DocsSection } from './DocsSection';
import { AnimatedCounter, RevealOnScroll } from './AnimatedCounter';
import feedbackData from '../data/communityFeedback.json';
import { formatAddress } from '../utils/contract';

interface LandingProps {
  onLaunchTerminal: () => void;
  contractAddress?: string;
  network?: string;
}

export const LandingPage: React.FC<LandingProps> = ({ 
  onLaunchTerminal,
  contractAddress,
  network = 'Preprod'
}) => {
  // Interactive Hero Preview State
  const [simulatedBid, setSimulatedBid] = useState(145000);
  const [simulatedReserve] = useState(100000);
  const [isSimulatingProof, setIsSimulatingProof] = useState(false);
  const [proofCompleted, setProofCompleted] = useState(false);

  const handleSimulateProof = () => {
    setIsSimulatingProof(true);
    setProofCompleted(false);
    setTimeout(() => {
      setIsSimulatingProof(false);
      setProofCompleted(true);
    }, 1600);
  };

  return (
    <div className="space-y-24 sm:space-y-32 py-6 overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="relative text-center space-y-8 pt-6 pb-10 max-w-4xl mx-auto">
        {/* Subtle Backdrop Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/70 text-indigo-300 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Midnight Network {network} • Compact v0.34 Toolchain</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Confidential Sealed-Bid <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Procurement on Midnight
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate bid sniping, front-running, and supplier price leakage. Execute browser-local zero-knowledge proofs via Lace without ever exposing confidential valuations to validators or competitors.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onLaunchTerminal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl saas-button-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl saas-button-secondary text-slate-200 font-semibold text-sm flex items-center justify-center gap-2"
          >
            Explore How It Works
          </a>
        </div>

        {/* Key Metrics Bar with Count-Up Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          <div className="saas-card p-3.5 text-center transition-all hover:border-slate-700">
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              <AnimatedCounter end={52} suffix="+" duration={1800} />
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Preprod Testers</div>
          </div>

          <div className="saas-card p-3.5 text-center transition-all hover:border-slate-700">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              <AnimatedCounter end={100} suffix="%" duration={1600} />
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Private Witness</div>
          </div>

          <div className="saas-card p-3.5 text-center transition-all hover:border-slate-700">
            <div className="text-xl sm:text-2xl font-black text-indigo-400 font-mono">
              <AnimatedCounter end={0} duration={1000} />
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Mempool Leakage</div>
          </div>

          <div className="saas-card p-3.5 text-center transition-all hover:border-slate-700">
            <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">
              <AnimatedCounter end={3} prefix="< " suffix="s" duration={1400} />
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">Local ZK Proof</div>
          </div>
        </div>

        {/* Interactive Hero Preview Card */}
        <div className="pt-8 max-w-2xl mx-auto text-left">
          <div className="saas-card p-5 sm:p-6 border border-slate-800 bg-slate-950/70 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Interactive ZK Simulation
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Lace Prover Simulation
              </span>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Tender: Global Cloud Infrastructure</span>
                <span className="text-slate-300 font-mono">Reserve: ${simulatedReserve.toLocaleString()}</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">Your Confidential Bid Amount:</span>
                  <span className="font-mono font-bold text-indigo-300">${simulatedBid.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="90000"
                  max="200000"
                  step="5000"
                  value={simulatedBid}
                  onChange={(e) => setSimulatedBid(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>$90,000 (Below reserve)</span>
                  <span>$200,000 (Qualifying)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-[11px]">
                    {simulatedBid >= simulatedReserve ? (
                      <span className="text-emerald-400 font-medium">Valid: Satisfies secretBid &gt;= reserve</span>
                    ) : (
                      <span className="text-amber-400 font-medium">Under Reserve: Circuit constraint fails</span>
                    )}
                  </span>
                </div>

                <button
                  onClick={handleSimulateProof}
                  disabled={isSimulatingProof || simulatedBid < simulatedReserve}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    simulatedBid >= simulatedReserve
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSimulatingProof ? (
                    <>
                      <Cpu className="w-3.5 h-3.5 animate-spin text-indigo-300" />
                      Proving...
                    </>
                  ) : proofCompleted ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Proved Locally!
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      Simulate ZK Proof
                    </>
                  )}
                </button>
              </div>

              {proofCompleted && (
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                  <span>
                    ✅ <strong>Zero-Knowledge Claim Verified:</strong> Proven valid without revealing ${simulatedBid.toLocaleString()} on-chain!
                  </span>
                  <button
                    onClick={onLaunchTerminal}
                    className="text-xs text-indigo-300 underline font-semibold shrink-0 ml-2"
                  >
                    Try on Preprod &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. ABOUT SECTION (#about)
      ────────────────────────────────────────────────────────────── */}
      <section id="about" className="space-y-12 scroll-mt-24">
        <RevealOnScroll className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-indigo text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Enterprise Problem & Solution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Procurement Paradox in Web3
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standard blockchains offer transparent ledgers, but total transparency destroys fair competitive bidding.
            </p>
          </div>

          {/* Comparison Cards: Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Problem Card */}
            <div className="saas-card p-6 border-red-900/30 bg-slate-950/80 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Transparent Bidding Flaws</h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Front-Running & Sniping:</strong> Bots read mempool transactions and submit slightly better bids at the last millisecond.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Pricing Leakage:</strong> Competitors inspect your exact unit pricing and profit margins, harming future negotiations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Centralized Intermediary Risk:</strong> Traditional platforms rely on trusted third parties that can leak or alter bids.</span>
                </li>
              </ul>
            </div>

            {/* Solution Card */}
            <div className="saas-card p-6 border-emerald-900/30 bg-slate-950/80 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">The Bidveil ZK Solution</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Zero Information Leakage:</strong> Private witness inputs stay strictly in local browser memory and never touch the mempool.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Cryptographic Compliance:</strong> Mathematically proves compliance with minimum reserve prices without disclosing actual values.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Verifiable Settlement:</strong> Midnight's dual-state ledger increments public bid counts and settles tenders trustlessly.</span>
                </li>
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. HOW IT WORKS SECTION (#how-it-works)
      ────────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="space-y-12 scroll-mt-24">
        <RevealOnScroll className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-purple text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Architecture & Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              How Bidveil Works
            </h2>
            <p className="text-sm text-slate-400">
              A seamless 4-step pipeline combining local client-side zero-knowledge proof synthesis with Midnight ledger state transitions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="saas-card p-5 space-y-3 relative group hover:border-indigo-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h4 className="font-bold text-sm text-white">Tender Issuance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buyer defines procurement requirements and initializes the Compact contract on Midnight with a minimum public reserve price.
              </p>
            </div>

            <div className="saas-card p-5 space-y-3 relative group hover:border-indigo-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h4 className="font-bold text-sm text-white">Private Witness Input</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vendor inputs confidential bid valuation. The numerical figure stays strictly in local browser memory and is never broadcast.
              </p>
            </div>

            <div className="saas-card p-5 space-y-3 relative group hover:border-indigo-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-mono font-bold text-xs">
                03
              </div>
              <h4 className="font-bold text-sm text-white">Browser ZK Synthesis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lace Midnight wallet generates a client-side zk-SNARK proof verifying <code className="text-slate-300">secretBid &gt;= reservePrice</code> in seconds.
              </p>
            </div>

            <div className="saas-card p-5 space-y-3 relative group hover:border-indigo-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-mono font-bold text-xs">
                04
              </div>
              <h4 className="font-bold text-sm text-white">Public Verification</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Midnight verifies the zero-knowledge proof on-chain, updates the public verified bid count, and logs a tamper-proof receipt.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FEEDBACKS SECTION (#feedbacks)
      ────────────────────────────────────────────────────────────── */}
      <section id="feedbacks" className="space-y-10 scroll-mt-24">
        <RevealOnScroll className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-emerald text-xs font-semibold mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Level 5 Community Validation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Tester Feedback & Validation
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Real feedback collected from 52 developers, university clubs, and community testers actively executing transactions on Midnight Preprod.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://docs.google.com/spreadsheets/d/1WpDsI_xM6REz3oA3sWqv5Smv5vBbH9VOmJW8XtKJZ8c/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                Public Google Sheet <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://forms.gle/JS3LoCsJGQGh144n9"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-xs font-semibold text-indigo-300 hover:bg-indigo-600/30 flex items-center gap-1.5 transition-colors"
              >
                Submit Feedback Form <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Feedback Cards Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {feedbackData.slice(0, 6).map((item) => (
              <div key={item.id} className="saas-card p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-white">{item.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{item.email}</span>
                    </div>
                    <div className="flex text-amber-400 text-xs">
                      {'★'.repeat(item.rating)}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic pt-2 leading-relaxed">
                    "{item.summary}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-mono">{formatAddress(item.wallet, 6, 4)}</span>
                  <span className="text-emerald-400 font-medium">Verified Preprod</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onLaunchTerminal}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1"
            >
              Launch Terminal to test Bidveil yourself &rarr;
            </button>
          </div>
        </RevealOnScroll>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. DOCS SECTION (#docs)
      ────────────────────────────────────────────────────────────── */}
      <RevealOnScroll>
        <DocsSection />
      </RevealOnScroll>

      {/* ─────────────────────────────────────────────────────────────
          6. BOTTOM CTA BANNER
      ────────────────────────────────────────────────────────────── */}
      <RevealOnScroll>
        <section className="saas-card p-8 sm:p-12 text-center relative overflow-hidden border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-indigo-950/40">
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to Conduct Front-Running Proof Procurement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect your Lace wallet on Midnight Preprod and experience zero-knowledge sealed-bid auctions with verifiable privacy.
            </p>
            <div className="pt-2">
              <button
                onClick={onLaunchTerminal}
                className="px-8 py-3.5 rounded-xl saas-button-primary text-white font-bold text-xs shadow-xl shadow-indigo-600/30"
              >
                Get Started with Bidveil &rarr;
              </button>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
};
