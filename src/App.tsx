import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { WalletConnect } from './components/WalletConnect';
import { SealedBidding } from './components/SealedBidding';
import { LandingPage } from './components/LandingPage';
import { useMidnight } from './hooks/useMidnight';

export const App: React.FC = () => {
  // Default to the complete SaaS Landing experience with Hero, About, How It Works, Feedbacks, and Docs
  const [activeTab, setActiveTab] = useState<'landing' | 'terminal'>('landing');

  const {
    isConnected,
    walletAddress,
    balance,
    network,
    isConnecting,
    isExtensionDetected,
    error,
    contractAddress,
    bidCount,
    reservePrice,
    isOpen,
    isProving,
    txHash,
    connectWallet,
    disconnectWallet,
    executeCircuitCall,
  } = useMidnight();

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isConnected={isConnected}
      network={network}
    >
      {activeTab === 'landing' ? (
        <LandingPage
          onLaunchTerminal={() => setActiveTab('terminal')}
          contractAddress={contractAddress}
          network={network}
        />
      ) : (
        <div className="space-y-6">
          {/* Header Banner to return to SaaS Homepage */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Bidveil Bidding Terminal</h2>
              <p className="text-xs text-slate-400">Zero-Knowledge Sealed-Bid Execution Environment</p>
            </div>
            <button
              onClick={() => setActiveTab('landing')}
              className="px-3.5 py-1.5 rounded-xl saas-button-secondary text-xs font-semibold"
            >
              &larr; Back to Overview
            </button>
          </div>

          {/* Wallet Connection Card */}
          <WalletConnect
            isConnected={isConnected}
            walletAddress={walletAddress}
            balance={balance}
            network={network}
            isConnecting={isConnecting}
            isExtensionDetected={isExtensionDetected}
            error={error}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
          />

          {/* Main Privacy Feature: Sealed Bidding */}
          <SealedBidding
            contractAddress={contractAddress}
            bidCount={bidCount}
            reservePrice={reservePrice}
            isOpen={isOpen}
            isConnected={isConnected}
            isProving={isProving}
            txHash={txHash}
            error={error}
            onExecuteCircuit={executeCircuitCall}
          />
        </div>
      )}
    </Layout>
  );
};

export default App;
