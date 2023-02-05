import { useState } from "react";
import DigitRoll from "digit-roll-react";
import "./lottery_roll.css";
import ticket from "../../assets/ticket.svg";

export default function LotteryApp() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 1000000));

  const refresh = () => {
    setNumber(Math.floor(Math.random() * 1000000));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3">
        <div className="text-grey-font mb-4">Your lotter number</div>
        <DigitRoll num={number} length={6} divider="" className="mb-4" />
        <button
          className="rounded-full  px-8 py-2 text-md border-2 text-white mb-2"
          onClick={(e) => {
            refresh();
          }}
        >
          Reroll numbers
        </button>
        <div className="w-full">
          <hr className="bg-divider-dark" />
        </div>
        <div className="flex flex-row justify-between flex-grow w-full">
          <div className="flex flex-row justify-start">
            <div className="mr-2">Result in</div>
            <div className="text-white"> 3 days 2 hours</div>
          </div>
          <div className="flex flex-row items-center">
            <div className="mr-1 mt-1">
              <img src={ticket} alt="Ticket" />
            </div>
            <div className="text-white">2</div>
          </div>
        </div>
      </div>
      <button className="rounded-full bg-white px-12 py-2 text-xl">
        Confirm Number
      </button>
    </div>
  );
}
