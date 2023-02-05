import ticket from "../../assets/ticket.svg";
import arrowRight from "../../assets/arrow_right.svg";

export default function LotterMessage() {
  return (
    <div className="flex flex-col items-center m-8 bg-slight-black text-grey-font rounded-lg p-4 w-1/3">
      <div className="text-white mb-2">Welcome to lottery 💰</div>
      <div className="text-center mb-2">
        Fildex lottery is a unique incentive for users buy tickets with tokens
        to get a chance to win a prize.
      </div>
      <div className="text-center mb-2">
        The prize pool here is determined by the number of tickets sold and the
        total amount which is distributed among participant
      </div>
      <div className="w-full">
        <hr className="bg-divider-dark" />
      </div>
      <div className="flex flex-row justify-between flex-grow w-full">
        <div className="flex flex-row justify-start">
          <div className="mr-1 mt-1">
            <img src={ticket} alt="Ticket" />
          </div>
          <div>Your tickets</div>
          <div className="text-white ml-2">2</div>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-white mr-2">Buy more tickets</div>
          <div className="mr-1">
            <img src={arrowRight} alt=">" />
          </div>
        </div>
      </div>
    </div>
  );
}
