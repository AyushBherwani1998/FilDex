import successLogo from "../assets/success_logo.svg";
import fileLogo from "../assets/filcoin_logo.svg";

export default function SwapSuccess({ fromName, toName, fromQty, toQty }) {
  return (
    <div className="flex justify-start flex-col m-8 text-white rounded-lg p-4 w-1/2 bg-gradient-to-b from-gradient-green to-gradient-black">
      <div className="flex justify-center my-2">
        <img src={successLogo} alt="Success" />
      </div>
      <div className="flex justify-center my-2">
        <p>Your transaction has been submitted</p>
      </div>
      <div className="flex justify-center my-2 items-center">
        <div className="flex flex-row">
          <img src={fileLogo} alt="f" />
          <div className="flex flex-col justify-start items-start ml-2">
            <div className="text-md">{fromQty}</div>
            <div className="text-xs text-grey-font">{fromName}</div>
          </div>
        </div>
        <div className="mx-12 text-xs">to</div>
        <div className="flex flex-row">
          <img src={fileLogo} alt="f" />
          <div className="flex flex-col justify-start items-start ml-2">
            <div className="text-md">{toQty}</div>
            <div className="text-xs text-grey-font">{toName}</div>
          </div>
        </div>
      </div>
      <div className="mb-6" />
    </div>
  );
}
