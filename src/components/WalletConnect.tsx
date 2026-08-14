import React, { useState } from 'react';
import { Wallet, LogOut, Check, Copy, AlertTriangle, ShieldCheck, RefreshCw, Coins } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  balance?: string;
  isConnecting: boolean;
  error: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  network,
  balance = '5,000.00 tNIGHT',
  isConnecting,
  error,
  onConnect,
  onDisconnect,
}) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncatedAddress = walletAddress
    ? `${walletAddress.slice(0, 14)}...${walletAddress.slice(-8)}`
    : '';

  return (
    <div className="clay-card p-6 border border-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Wallet Identity Section */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              isConnected
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            }`}
          >
            <Wallet className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-100">Lace Midnight Wallet</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                {network}
              </span>
            </div>

            {isConnected ? (
              <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected & Ready to Prove
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">
                Connect your Lace wallet to generate and submit zero-knowledge sealed bids
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {isConnected ? (
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
              {/* Balance Badge */}
              <div className="px-3.5 py-2 rounded-xl bg-gray-950/80 border border-gray-800 flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block leading-none">Balance</span>
                  <span className="text-xs font-mono font-bold text-gray-100">{balance}</span>
                </div>
              </div>

              <button
                onClick={onDisconnect}
                className="px-4 py-2.5 rounded-xl clay-button-secondary text-gray-300 hover:text-rose-400 font-medium text-xs transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="px-6 py-2.5 rounded-xl clay-button-primary text-white font-semibold text-xs transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Connecting Lace...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Lace Wallet
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Connected Address Bar */}
      {isConnected && walletAddress && (
        <div className="mt-4 pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-950/60 rounded-xl p-3.5 border border-gray-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Account:</span>
            <span className="font-mono text-xs text-emerald-300 font-semibold truncate" title={walletAddress}>
              {truncatedAddress}
            </span>
          </div>

          <button
            onClick={copyAddress}
            className="px-3 py-1.5 rounded-lg clay-button-secondary text-gray-300 text-xs font-mono transition-all flex items-center gap-1.5 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Address
              </>
            )}
          </button>
        </div>
      )}

      {/* Error Messaging */}
      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">Connection Alert</span>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};
