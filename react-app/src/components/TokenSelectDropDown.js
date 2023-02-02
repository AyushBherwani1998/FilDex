import dropDrop from "./../assets/drop_down.svg";

export default function TokenSelectDropDown({
  tokenName,
  tokenBalance,
  tokenLogo,
}) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col justify-center">
        {tokenLogo != null ? (
          <img src={tokenLogo} alt="F" />
        ) : (
          <div className="p-4 border border-dashed rounded-full bg-placeholder-dark-text"></div>
        )}
      </div>
      {tokenBalance != null ? (
        <div className="flex flex-col ml-4">
          <div className="text-white">{tokenName}</div>
          <div className="text-sm">Bal: {tokenBalance}</div>
        </div>
      ) : (
        <div className="flex flex-col ml-4 justify-center">
          <div className="text-white">Select Token</div>
        </div>
      )}
      <div className="flex flex-col p-4 justify-center">
        <img src={dropDrop} alt="v" />
      </div>
    </div>
  );
}
