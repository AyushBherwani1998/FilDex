import ticket from "../../../assets/ticket.svg";

export default function LotterMessage({ ticketNumber, lotteryStatus }) {
  const lotteryStatusMessage = () => {
    if (lotteryStatus === "0") {
      return "Result is Pending";
    } else if (lotteryStatus === "1") {
      return "";
    } else if (lotteryStatus === "2") {
      return "We are not accepting any new entries";
    } else if (lotteryStatus === "3") {
      return "Lottery is Claimable";
    }
  };

  const displayTicketNumber = () => {
    if (ticketNumber === null || ticketNumber === "0") {
      return ticketNumber;
    }

    const numberForSubmission = reverseNumber(
      Number(String(ticketNumber)) - 1000000
    );
    return numberForSubmission;
  };

  function reverseNumber(num) {
    // Initializing the result variable
    const ans = Number(String(num).split("").reverse().join(""));

    return ans;
  }

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
          <div>{ticketNumber !== "0" ? "Ticket Number" : "Your Tickets"}</div>
          <div className="text-white ml-2">
            {ticketNumber !== "0" ? displayTicketNumber() : "Not Purchased"}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-white mr-2">{lotteryStatusMessage()}</div>
        </div>
      </div>
    </div>
  );
}
