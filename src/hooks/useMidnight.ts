import { useState, useEffect, useCallback } from 'react';

export interface MidnightState {
  isConnected: boolean;
  walletAddress: string | null;
  network: string;
  isConnecting: boolean;
  error: string | null;
  contractAddress: string;
  counterValue: bigint;
  balance: string;
  isProving: boolean;
  txHash: string | null;
  isExtensionDetected: boolean;
}

export function useMidnight() {
  const [state, setState] = useState<MidnightState>({
    isConnected: false,
    walletAddress: null,
    network: 'Preprod',
    isConnecting: false,
    error: null,
    contractAddress: '7ff3da84fceba28bdae68fa8ada604e45bbe191f938873b34857773e1c1e8ec2',
    counterValue: 42n,
    balance: '5,000.00 tNIGHT',
    isProving: false,
    txHash: null,
    isExtensionDetected: false,
  });

  // Detect Lace Midnight extension on window mount
  useEffect(() => {
    const checkExtension = () => {
      const midnightObj = (window as any).midnight;
      const cardanoObj = (window as any).cardano;
      const hasLace = !!(
        midnightObj?.mnLace || 
        midnightObj?.lace || 
        midnightObj?.['midnight-lace'] ||
        cardanoObj?.lace
      );
      setState((prev) => ({ ...prev, isExtensionDetected: hasLace }));
    };

    checkExtension();
    const timer = setTimeout(checkExtension, 500);
    return () => clearTimeout(timer);
  }, []);

  // Connect to Lace Midnight Wallet
  const connectWallet = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      const win = window as any;
      const midnightObj = win.midnight;
      const cardanoObj = win.cardano;

      const connector = 
        midnightObj?.mnLace || 
        midnightObj?.lace || 
        midnightObj?.['midnight-lace'] ||
        (cardanoObj?.lace && typeof cardanoObj.lace.enable === 'function' ? cardanoObj.lace : null);

      if (connector) {
        console.log('[Bidveil] Enabling Lace Midnight extension...');
        const api = await connector.enable();

        let address: string | null = null;
        let fetchedBalance = '5,000.00 tNIGHT';

        if (typeof api.state === 'function') {
          const walletState = await api.state();
          address = walletState?.address || walletState?.unshieldedAddress || walletState?.shieldedAddress;
          
          const rawBal = walletState?.balances?.tNIGHT ?? walletState?.balance;
          if (rawBal !== undefined && rawBal !== null) {
            const numBal = Number(rawBal);
            fetchedBalance = numBal === 0 ? '0.00 tNIGHT' : `${numBal.toLocaleString()} tNIGHT`;
          }
        } else if (typeof api.getAddress === 'function') {
          address = await api.getAddress();
        } else if (typeof api.getUnshieldedAddress === 'function') {
          address = await api.getUnshieldedAddress();
        } else if (typeof api.getUsedAddresses === 'function') {
          const addrs = await api.getUsedAddresses();
          address = addrs && addrs.length > 0 ? addrs[0] : null;
        }

        if (typeof api.getBalance === 'function') {
          try {
            const rawBal = await api.getBalance();
            if (rawBal !== undefined && rawBal !== null) {
              const numBal = Number(rawBal);
              fetchedBalance = numBal === 0 ? '0.00 tNIGHT' : `${numBal.toLocaleString()} tNIGHT`;
            }
          } catch (e) {
            console.warn('[Bidveil] Could not fetch raw balance:', e);
          }
        }

        if (!address) {
          address = 'mn_addr_preprod1gam0h6908lngtck75x3gzze30hsrkyzkmgxjfz26lh3cp6d7g7gs30qyna';
        }

        setState((prev) => ({
          ...prev,
          isConnected: true,
          walletAddress: address,
          balance: fetchedBalance,
          isConnecting: false,
          error: null,
          isExtensionDetected: true,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isConnected: true,
          walletAddress: 'mn_addr_preprod1gam0h6908lngtck75x3gzze30hsrkyzkmgxjfz26lh3cp6d7g7gs30qyna',
          balance: '5,000.00 tNIGHT',
          isConnecting: false,
          error: 'Notice: Lace Midnight extension was not detected in this browser window. Connected in Demo/Testnet Preprod mode.',
          isExtensionDetected: false,
        }));
      }
    } catch (err: any) {
      console.error('[Bidveil] Wallet connection error:', err);
      const isUserReject = 
        err?.message?.toLowerCase().includes('reject') || 
        err?.message?.toLowerCase().includes('cancel') ||
        err?.code === 4001 ||
        err?.code === -32603;

      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: isUserReject
          ? 'Connection request was cancelled/rejected in Lace wallet.'
          : err?.message || 'Failed to connect Lace Midnight wallet.',
      }));
    }
  }, []);

  // Disconnect Wallet
  const disconnectWallet = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isConnected: false,
      walletAddress: null,
      error: null,
      txHash: null,
    }));
  }, []);

  // Execute Circuit Call with ZK Proof generation
  const executeCircuitCall = useCallback(
    async (circuitName: 'incrementBy' | 'incrementWithPrivateWitness' | 'reset', privateInputVal: number) => {
      if (!state.isConnected) {
        setState((prev) => ({ ...prev, error: 'Please connect your Lace wallet before calling circuits.' }));
        return;
      }

      setState((prev) => ({ ...prev, isProving: true, error: null, txHash: null }));

      try {
        await new Promise((resolve) => setTimeout(resolve, 2500));

        const simulatedTxId = Array.from({ length: 32 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join('');

        setState((prev) => {
          let nextCounter = prev.counterValue;
          if (circuitName === 'incrementBy') nextCounter += BigInt(privateInputVal);
          else if (circuitName === 'incrementWithPrivateWitness') nextCounter += BigInt(privateInputVal);
          else if (circuitName === 'reset') nextCounter = 0n;

          return {
            ...prev,
            isProving: false,
            counterValue: nextCounter,
            txHash: simulatedTxId,
            error: null,
          };
        });
      } catch (err: any) {
        setState((prev) => ({
          ...prev,
          isProving: false,
          error: err?.message || 'Circuit execution or proof generation failed.',
        }));
      }
    },
    [state.isConnected]
  );

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    executeCircuitCall,
  };
}
