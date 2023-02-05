import ConnectWalletButton from "./ConnectWalletButton";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import appLogo from "../assets/app_logo.svg";
import pushLogo from "../assets/push_logo.svg";
import NotificationButton from "./push/NotificationButton";

export default function NavigationBar({ status, connect, chainId, account }) {
  return (
    <Navbar className="m-2">
      <Container>
        <Navbar.Brand href="/">
          <img src={appLogo} alt="FilDex" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"> <div className="mx-4 text-s text-white">Swap</div></Nav.Link>
            <Nav.Link href="/liquidity"> <div className="mx-4 text-s text-white">Supply FIL-FDX</div></Nav.Link>
            <Nav.Link href="/wrap"> <div className="mx-4 text-s text-white">Wrap/UnWrap</div></Nav.Link>
            <Nav.Link href="/lottery"> <div className="mx-4 text-s text-white">Lottery</div></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NotificationButton />
        <ConnectWalletButton
          status={status}
          connect={connect}
          account={account}
          chainId={chainId}
        />
      </Container>
    </Navbar>
    // <div className="flex flex-row justify-between my-4 mx-4">
    //   <div className="flex flex-row text-white items-center">
    //     <img src={appLogo} alt="FilDex" />
    //     <div className="ml-12" />
    //     <div className="mx-4 text-xs">Swap</div>
    //     <div className="mx-4 text-xs">Supply FIL-FDX</div>
    //     <div className="mx-4 text-xs">Wrap/UnWrap</div>
    //     <div className="mx-4 text-xs">Lottery</div>
    //    
    //   </div>
    //   <ConnectWalletButton
    //     status={status}
    //     connect={connect}
    //     account={account}
    //     chainId={chainId}
    //   />
    // </div>
  );
}
