import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetaMaskProvider } from "metamask-react";
import requestForChannelOptIn from "./push/opt_int_channel";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetaMaskProvider>
    <React.StrictMode className="bg-black">
      <App />
    </React.StrictMode>
  </MetaMaskProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.onload = () => {
  requestForChannelOptIn("0x4b08B1ece8faC899bA6243FBb0DA09B7dE63dA06");
}
