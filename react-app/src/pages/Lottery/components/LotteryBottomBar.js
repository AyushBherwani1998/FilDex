import ticket from "../../../assets/ticket.svg";

export default function LotteryBottomBar() {
  return (
    <div className="flex flex-row justify-between flex-grow w-full">
      <div className="flex flex-row justify-start">
        <div className="mr-2">Result in</div>
        <div className="text-white"> 3 days 2 hours</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-1 mt-1">
          <img src={ticket} alt="Ticket" />
        </div>
        <div className="text-white">1</div>
      </div>
    </div>
  );
}
