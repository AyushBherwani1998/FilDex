import ConnectWalletButton from "./ConnectWalletButton";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import appLogo from "../assets/fildex-mark.svg";
import pushLogo from "../assets/push_logo.svg";
import NotificationButton from "./push/NotificationButton";

export default function NavigationBar({ status, connect, chainId, account }) {
  return (
    <Navbar className="my-8 mx-16">
      <Container fluid>
        <Navbar.Brand href="/" className="flex relative">
          <img src={appLogo} alt="FilDex" className="w-40 hover: group" />

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="mx-auto">
          <Nav className=" my-2 my-lg-0">
            <Nav.Link href="/" className="hover:bg-hover-fill mx-3 rounded active:bg-blue-600"> <div className="mx-4 text-s text-white ">Swap</div></Nav.Link>
            <Nav.Link href="/liquidity" className="hover:bg-hover-fill mx-3 rounded active:bg-blue-600"> <div className="mx-4 text-s text-white"> Supply FIL-FDX</div></Nav.Link>
            <Nav.Link href="/wrap" className="hover:bg-hover-fill mx-3 rounded active:bg-blue-600"> <div className="mx-4 text-s text-white">Wrap/UnWrap</div></Nav.Link>
            <Nav.Link href="/lottery" className="hover:bg-hover-fill mx-3 rounded active:bg-blue-600"> <div className="mx-4 text-s text-white"> 💸 Lottery</div></Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <NotificationButton
          userAddress={account}
          connect={connect}
          chainId={chainId}
        />
        <ConnectWalletButton
          status={status}
          connect={connect}
          account={account}
          chainId={chainId}
        />
      </Container>
    </Navbar>
  );
}


