import React, { useState } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';
import { LandingPage } from './components/LandingPage';
import { 
  ShieldCheck, 
  ExternalLink, 
  LayoutDashboard, 
  Compass, 
  Layers, 
  FileText,
  Activity,
  Code2
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landing' | 'terminal'>('landing');

  const {
    isConnected,
    walletAddress,
    network,
    balance,
    isConnecting,
    error,
    contractAddress,
    counterValue,
    isProving,
    txHash,
    connectWallet,
    disconnectWallet,
    executeCircuitCall,
  } = useMidnight();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <header className="border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                  Bidveil
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    SaaS ZK
                  </span>
                </h1>
                <p className="text-[11px] text-gray-400">Confidential Procurement on Midnight</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 bg-gray-900/80 rounded-2xl border border-gray-800">
              <button
                onClick={() => setActiveTab('landing')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'landing'
                    ? 'clay-button-primary text-white shadow-md'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Home & Overview
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'terminal'
                    ? 'clay-button-primary text-white shadow-md'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Bidding Terminal
                {isConnected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
                )}
              </button>
            </nav>

            {/* Top Right Actions */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Activity className="w-3 h-3 animate-pulse" />
                Preprod Active
              </span>

              {activeTab === 'landing' ? (
                <button
                  onClick={() => setActiveTab('terminal')}
                  className="px-4 py-2 rounded-xl clay-button-primary text-white font-bold text-xs shadow-lg"
                >
                  Launch App
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('landing')}
                  className="px-3.5 py-2 rounded-xl clay-button-secondary text-gray-300 font-semibold text-xs"
                >
                  Landing
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Main Body */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          {activeTab === 'landing' ? (
            <LandingPage onLaunchApp={() => setActiveTab('terminal')} />
          ) : (
            <div className="space-y-6">
              {/* Terminal Title Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Procurement Bidding Terminal
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Connect your wallet, select an active tender, and submit a confidential zero-knowledge offer.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://docs.midnight.network"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl clay-button-secondary text-gray-300 text-xs font-medium flex items-center gap-1.5"
                  >
                    Midnight Docs <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Wallet Connection Component */}
              <section>
                <WalletConnect
                  isConnected={isConnected}
                  walletAddress={walletAddress}
                  network={network}
                  balance={balance}
                  isConnecting={isConnecting}
                  error={error}
                  onConnect={connectWallet}
                  onDisconnect={disconnectWallet}
                />
              </section>

              {/* Transaction / Circuit Call Component */}
              <section>
                <CircuitCall
                  contractAddress={contractAddress}
                  counterValue={counterValue}
                  isConnected={isConnected}
                  isProving={isProving}
                  txHash={txHash}
                  error={error}
                  onExecuteCircuit={executeCircuitCall}
                />
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Modern SaaS Footer */}
      <footer className="relative z-10 border-t border-gray-800/80 bg-gray-950/80 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm text-gray-200">Bidveil SaaS</span>
              <span className="text-xs text-gray-500">| Powered by Midnight Network</span>
            </div>

            <div className="flex items-center gap-6 text-xs text-gray-400">
              <button onClick={() => setActiveTab('landing')} className="hover:text-white transition-colors">About</button>
              <button onClick={() => setActiveTab('landing')} className="hover:text-white transition-colors">How it works</button>
              <button onClick={() => setActiveTab('terminal')} className="hover:text-white transition-colors">Terminal</button>
              <a href="https://github.com/xynezakg/Midnight-Xyn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> Repo
              </a>
            </div>
          </div>

          <div className="text-center text-[11px] text-gray-500 pt-4 border-t border-gray-900">
            © 2026 Bidveil. Built with Compact Language and Midnight.js for the Midnight Builder Challenge on Rise In.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
