import FilDexConstants from "../Constants";

export default function ConnectWalletButton({
  status,
  connect,
  account,
  chainId,
}) {
  if (status === FilDexConstants.initializing)
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === FilDexConstants.unavailable)
    return <div>MetaMask not available :(</div>;

  if (status === FilDexConstants.notConnected)
    return (
      <button
        onClick={connect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Connect to MetaMask
      </button>
    );

  if (status === FilDexConstants.connecting) return <div>Connecting...</div>;

  if (status === FilDexConstants.connected) {
    return (
      <div className="text-white">
        Connected account {account} on chain ID {chainId}
      </div>
    );
  }

  return null;
}
