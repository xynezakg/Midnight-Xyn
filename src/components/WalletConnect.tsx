import React, { useState } from 'react';
import { 
  Wallet, 
  LogOut, 
  Check, 
  Copy, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  Coins, 
  Sparkles,
  Zap
} from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  balance?: string;
  isConnecting: boolean;
  error: string | null;
  connectionType?: 'lace' | 'sandbox' | null;
  onConnect: () => void;
  onConnectSandbox?: () => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  network,
  balance = '5,000.00 tNIGHT',
  isConnecting,
  error,
  connectionType = 'sandbox',
  onConnect,
  onConnectSandbox,
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
    <div className="saas-card p-5 sm:p-6 border border-slate-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Wallet Identity Section */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              isConnected
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
            }`}
          >
            <Wallet className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white">
                {isConnected ? 'Midnight Wallet Connected' : 'Connect Midnight Wallet'}
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold badge-indigo">
                <ShieldCheck className="w-3 h-3" />
                {network}
              </span>
              {isConnected && connectionType && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono badge-emerald">
                  {connectionType === 'lace' ? 'Live Lace' : 'Sandbox Session'}
                </span>
              )}
            </div>

            {isConnected ? (
              <p className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Ready to generate browser zk-SNARK proofs
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-0.5">
                Connect your Lace extension or launch an instant Preprod testnet sandbox session
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {isConnected ? (
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between">
              {/* Balance Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <div>
                  <span className="text-[9px] uppercase font-semibold text-slate-400 block leading-none">Balance</span>
                  <span className="text-xs font-mono font-bold text-white">{balance}</span>
                </div>
              </div>

              <button
                onClick={onDisconnect}
                className="px-3.5 py-2 rounded-xl saas-button-secondary text-slate-300 hover:text-rose-400 text-xs transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Disconnect
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl saas-button-primary text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Awaiting Lace Approval...
                  </>
                ) : (
                  <>
                    <Wallet className="w-3.5 h-3.5" />
                    Connect Live Lace
                  </>
                )}
              </button>

              {onConnectSandbox && (
                <button
                  onClick={onConnectSandbox}
                  className="px-3.5 py-2.5 rounded-xl saas-button-secondary text-xs font-semibold flex items-center justify-center gap-1.5 text-slate-200"
                  title="Connect instantly using verified Preprod credentials without waiting for browser extensions"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Sandbox Mode
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Connected Address Bar */}
      {isConnected && walletAddress && (
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-950/70 rounded-xl p-3 border border-slate-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Account:</span>
            <span className="font-mono text-xs text-emerald-300 font-semibold truncate" title={walletAddress}>
              {truncatedAddress}
            </span>
          </div>

          <button
            onClick={copyAddress}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto border border-slate-800"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy Address
              </>
            )}
          </button>
        </div>
      )}

      {/* Error Messaging with Sandbox Quick-Start Button */}
      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-amber-300">Connection Notice</span>
              {error}
            </div>
          </div>

          {onConnectSandbox && !isConnected && (
            <button
              onClick={onConnectSandbox}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1 shadow"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Use Preprod Sandbox
            </button>
          )}
        </div>
      )}
    </div>
  );
};
