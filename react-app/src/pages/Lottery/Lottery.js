import { useState } from "react";
import DigitRoll from "digit-roll-react";
import "./lottery_roll.css";
import LotteryBottomBar from "./LotteryBottomBar";
import LotterMessage from "./LotteryMessage";

export default function LotteryApp() {
  const [showLotteryMessage, setShowLotteryMessage] = useState(true);
  const [number, setNumber] = useState(Math.floor(Math.random() * 1000000));

  const refresh = () => {
    setNumber(Math.floor(Math.random() * 1000000));
  };

  const onClick = (e) => {
    if (showLotteryMessage) {
      setShowLotteryMessage(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {showLotteryMessage ? (
        <LotterMessage />
      ) : (
        <div className="flex flex-col items-center m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3">
          <div className="text-grey-font mb-4">Your lotter number</div>
          <DigitRoll num={number} length={6} divider="" className="mb-4" />
          <button
            className="rounded-full  px-8 py-2 text-md border-2 text-white mb-2"
            onClick={(e) => refresh()}
          >
            Reroll numbers
          </button>
          <div className="w-full">
            <hr className="bg-divider-dark" />
          </div>
          <LotteryBottomBar />
        </div>
      )}
      <button
        className="rounded-full bg-white px-12 py-2 text-xl"
        onClick={onClick}
      >
        {showLotteryMessage ? "Draw Lottery" : "Confirm Number"}
      </button>
    </div>
  );
}
