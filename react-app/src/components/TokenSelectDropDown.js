import dropDrop from "./../assets/drop_down.svg";

export default function TokenSelectDropDown({
  tokenName,
  tokenBalance,
  tokenLogo,
}) {
  return (
    <div className="group flex flex-row min-w-180 min-h-12 max-h-16 rounded-lg border-0	 hover:bg-hover-fill outline-none hover:border-hover-stroke transition delay-50">
      <div className="flex flex-col justify-center pl-2">
        {tokenLogo != null ? (
          <img src={tokenLogo} alt="F" />
        ) : (
          <div className="p-4 border border-dashed rounded-full bg-placeholder-dark-text"></div>
        )}
      </div>
      <div className="flex flex-col ml-4 justify-center">
        {tokenBalance != null ? (
          <div>
            <div className="text-white">{tokenName}</div>
            <div className="text-sm">Bal: {tokenBalance}</div>
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
