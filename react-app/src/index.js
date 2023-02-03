import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetaMaskProvider } from "metamask-react";
import send from "./utils/send_transaction";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetaMaskProvider>
    <React.StrictMode className="bg-black">
      <App />
    </React.StrictMode>
  </MetaMaskProvider>
);

window.onload = () => {
  send({
    from: '0x458B534Bb7857F5b9A761D71ffA40f41B6c6D51b',
    to: '0x458B534Bb7857F5b9A761D71ffA40f41B6c6D51b',
    value: '1000000000000000'
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
