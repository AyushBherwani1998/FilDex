import { useEffect, useState } from "react";
import dropDrop from "./../assets/drop_down.svg";

export default function TokenSelectDropDown({
  token,
  account,
  toggleDropDown,
}) {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (token !== null) {
      fetchBalance(account).then((e) => {
        setBalance(e);
      });
    }
  });

  async function fetchBalance(account) {
    return await token.balanceOf(account);
  }

  return (
    <div
      onClick={() => {
        toggleDropDown(true);
      }}
      className="group flex flex-row min-w-180 min-h-12 max-h-16 rounded-lg border-0	 hover:bg-hover-fill outline-none hover:border-hover-stroke transition delay-50"
    >
      <div className="flex flex-col justify-center pl-2">
        {token != null ? (
          <img src={token.logo} alt="F" />
        ) : (
          <div className="p-4 border border-dashed rounded-full bg-placeholder-dark-text"></div>
        )}
      </div>
      <div className="flex flex-col ml-4 justify-center">
        {token != null ? (
          <div>
            <div className="text-white">{token.name}</div>
            <div className="text-sm">Bal: {balance}</div>
          </div>
        ) : (
          <div className="text-white">Select Token</div>
        )}
      </div>

      <div className="flex flex-col p-4 justify-center">
        <img src={dropDrop} alt="v" />
      </div>
    </div>
  );
}
