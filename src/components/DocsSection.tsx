import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Terminal, 
  Lock, 
  Key, 
  Code2, 
  ExternalLink, 
  Copy, 
  Check, 
  HelpCircle,
  Cpu,
  FileText
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG } from '../utils/contract';

export const DocsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'circuits' | 'privacy' | 'faq'>('quickstart');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BIDVEIL_CONTRACT_CONFIG.preprodAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const faqs = [
    {
      q: 'How does Bidveil hide my bid amount from competitors?',
      a: 'Bidveil uses Midnight\'s Compact smart contract language. Your bid amount is treated as a private witness (secretBidAmount) that is only processed inside your local browser via the Lace wallet zk-SNARK prover. Only a mathematical proof that your bid satisfies "bid >= reservePrice" is broadcast on-chain.'
    },
    {
      q: 'Why does public blockchain bidding suffer without zero-knowledge?',
      a: 'On transparent blockchains like Ethereum or standard Cardano, transactions in the public mempool are visible before inclusion in a block. Rival suppliers can analyze competitors\' bids in real time, front-run proposals, and undercut pricing by trivial fractions.'
    },
    {
      q: 'What network is Bidveil running on?',
      a: 'Bidveil is deployed and verifiable on the Midnight Network Preprod testnet (Contract Address: 7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2). It is also compatible with the Preview testnet.'
    },
    {
      q: 'What wallet do I need to interact with Bidveil?',
      a: 'You need the Lace Midnight Wallet extension configured for the Preprod testnet, funded with tNIGHT testnet gas tokens from the official Midnight faucet.'
    }
  ];

  return (
    <div id="docs" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full badge-indigo text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Developer & Enterprise Documentation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Documentation & Specifications
        </h2>
        <p className="text-sm text-slate-400">
          Everything you need to understand Bidveil's zero-knowledge circuit architecture, Compact contract specifications, and testnet deployment.
        </p>
      </div>

      {/* Docs Container */}
      <div className="saas-card border border-slate-800/80 overflow-hidden">
        {/* Sub-navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto">
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`px-5 py-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'quickstart'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Quick Start & Wallet
          </button>

          <button
            onClick={() => setActiveTab('circuits')}
            className={`px-5 py-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'circuits'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Compact Circuits
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Privacy Model
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`px-5 py-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'faq'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'quickstart' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-indigo-400" />
                  Preprod Contract Deployment
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bidveil is actively deployed on the Midnight Network Preprod testnet. The smart contract was written in Compact and compiled with Compact compiler v0.34.
                </p>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Contract Address (Preprod & Preview)
                    </span>
                    <span className="font-mono text-xs text-indigo-300 break-all">
                      {BIDVEIL_CONTRACT_CONFIG.preprodAddress}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopyAddress}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 font-medium transition-colors"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedAddress ? 'Copied' : 'Copy'}
                    </button>
                    <a
                      href="https://indexer.preprod.midnight.network"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs flex items-center gap-1 font-medium transition-colors border border-indigo-500/30"
                    >
                      Explorer <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="text-indigo-400 font-bold text-xs">Step 1: Get Lace Wallet</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Install the official Lace Midnight browser extension from Chrome Web Store or Midnight developer portal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="text-indigo-400 font-bold text-xs">Step 2: Fund with tNIGHT</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Request free testnet tokens from the Midnight Preprod faucet to cover zero-knowledge proof gas fees.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="text-indigo-400 font-bold text-xs">Step 3: Connect & Bid</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Launch the Bidveil Terminal, select an active procurement tender, and submit your confidential sealed bid.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'circuits' && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Compact Circuit Architecture
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The smart contract is implemented in <code className="text-indigo-300">contracts/bidveil.compact</code> with state-isolated circuits:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-bold text-indigo-300">circuit submitSealedBid(): Void</code>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Private Witness</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Takes witness <code className="text-slate-300">secretBidAmount()</code>, proves <code className="text-slate-300">isOpen == true</code> and <code className="text-slate-300">secretBidAmount &gt;= reservePrice</code>, and increments <code className="text-slate-300">bidCount</code> on the public ledger without revealing the bid.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-bold text-indigo-300">circuit submitDisclosedBid(bidAmount: Uint&lt;64&gt;): Void</code>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Public Transition</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Used during the disclosed tender settlement phase to publish winning valuation metrics and finalize procurement contracts.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-bold text-indigo-300">circuit resetTender(newReserve: Uint&lt;64&gt;): Void</code>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Admin / Reset</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Resets tender state, sets a new reserve price, and zeroes the verified bid counter for subsequent procurement cycles.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                Zero-Knowledge Privacy Boundaries
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-300 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Component</th>
                      <th className="p-3">Privacy Level</th>
                      <th className="p-3">Where It Lives</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-400">
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">reservePrice</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">Public</span></td>
                      <td className="p-3 font-mono">On-chain Ledger</td>
                      <td className="p-3">Minimum qualifying threshold set by buyer</td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">bidCount</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">Public</span></td>
                      <td className="p-3 font-mono">On-chain Ledger</td>
                      <td className="p-3">Total count of verified conforming bids</td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">secretBidAmount</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">100% Private</span></td>
                      <td className="p-3 font-mono">Browser RAM Only</td>
                      <td className="p-3">Vendor pricing; never transmitted to network</td>
                    </tr>
                    <tr className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-slate-200">ZK-SNARK Proof</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">Public Proof</span></td>
                      <td className="p-3 font-mono">Mempool / Block</td>
                      <td className="p-3">Cryptographic assertion: bid &gt;= reserve</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <span className="text-indigo-400 font-mono">Q{i + 1}:</span> {faq.q}
                  </h4>
                  <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
