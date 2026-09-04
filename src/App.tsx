import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { WalletConnect } from './components/WalletConnect';
import { SealedBidding } from './components/SealedBidding';
import { LandingPage } from './components/LandingPage';
import { CommunityFeedback } from './components/CommunityFeedback';
import { useMidnight } from './hooks/useMidnight';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landing' | 'terminal' | 'feedback'>('terminal');

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
      ) : activeTab === 'feedback' ? (
        <CommunityFeedback
          isConnected={isConnected}
          walletAddress={walletAddress}
        />
      ) : (
        <div className="space-y-6">
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
