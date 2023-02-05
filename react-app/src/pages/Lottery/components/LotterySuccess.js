import SuccessComponent from "../../../components/SuccessComponent";
import pushLogo from "../../../assets/push_logo.svg";
import arrowRight from "../../../assets/arrow_right.svg";
export default function LotterySuccess({ number }) {
  return (
    <SuccessComponent
      title="Lottery submitted!"
      body={
        <div className="flex flex-col items-center my-2">
          <div className="text-white">{number}</div>
          <div className="text-grey-font">your lottery number</div>
        </div>
      }
      bottom={
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <div className="mr-4">
              <img src={pushLogo} alt="Push" className="h-8" />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-lg text-white">
                Don't miss out on it's results
              </div>
              <div className="text-xs text-white">
                Results in 3 days 2 hours
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div>Get notifications</div>
            <div>
              <img src={arrowRight} alt=">" className="ml-2" />
            </div>
          </div>
        </div>
      }
    />
  );
}
