import { useMetaMask } from "metamask-react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from "./components/NavigationBar";
import SwapApp from "./pages/Swap";
import WrapApp from "./pages/Wrap";
import LiquidityApp from "./pages/Liquidity";

export default function App() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <NavigationBar
          status={status}
          connect={connect}
          chainId={chainId}
          account={account}
        />
        <Routes>
          <Route path='/' element={<SwapApp
            status={status}
            connect={connect}
            account={account}
            ethereum={ethereum}
          />} />
          <Route path='/wrap' element={<WrapApp
            status={status}
            connect={connect}
            account={account}
            ethereum={ethereum}
          />} />
          <Route path='/liquidity' element={<LiquidityApp
            status={status}
            connect={connect}
            account={account}
            ethereum={ethereum}
          />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}
