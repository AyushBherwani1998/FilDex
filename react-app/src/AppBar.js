import ConnectWalletButton from "./components/ConnectWalletButton";
import appLogo from "./assets/app_logo.svg";
import pushLogo from "./assets/push_logo.svg";

export default function AppBar({ status, connect, chainId, account }) {
  return (
    <div className="flex flex-row justify-between my-4 mx-4">
      <div className="flex flex-row text-white items-center">
        <img src={appLogo} alt="FilDex" />
        <div className="ml-12" />
        <div className="mx-4 text-xs">Swap</div>
        <div className="mx-4 text-xs">Supply FIL-FDX</div>
        <div className="mx-4 text-xs">Wrap/UnWrap</div>
        <div className="mx-4 text-xs">Lottery</div>
        <div className="mx-4 text-xs flex flex-row justify-evenly items-center">
          <img src={pushLogo} alt="" />
          <div className="ml-2">Notifications</div>
        </div>
      </div>
      <ConnectWalletButton
        status={status}
        connect={connect}
        account={account}
        chainId={chainId}
      />
    </div>
  );
}
