import { useMetaMask } from "metamask-react";

export default function ConnectWalletButton({ onProvider }) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available :(</div>;

  if (status === "notConnected")
    return (
      <button
        onClick={connect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Connect to MetaMask
      </button>
    );

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected") {
    onProvider(ethereum, account);
    return (
      <div className="text-white">
        Connected account {account} on chain ID {chainId}
      </div>
    );
  }

  return null;
}
