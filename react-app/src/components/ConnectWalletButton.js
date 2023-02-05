import FilDexConstants from "../Constants";
import metamaskLogo from "../assets/metamask_logo.svg";

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
        className="rounded-full bg-white px-8 py-2 text-md"
      >
        Connect wallet
      </button>
    );

  if (status === FilDexConstants.connecting) return <div>Connecting...</div>;

  if (status === FilDexConstants.connected) {
    return (
      <div className="flex flex-row rounded-full bg-white px-8 py-2 text-md">
        <img src={metamaskLogo} alt="metamask" />
        <div className="ml-2">
          {chainId} • {account.substring(0, 4)}..
          {account.substring(account.length - 4)}
        </div>
      </div>
    );
  }

  return null;
}
