import { useState, useEffect } from "react";
import DigitRoll from "digit-roll-react";
import "./lottery_roll.css";
import LotteryBottomBar from "./components/LotteryBottomBar";
import LotterMessage from "./components/LotteryMessage";
import Web3 from "web3";
import LotterySuccess from "./components/LotterySuccess";
import makeLotteryContract from "../../contracts/LotteryContract";
import lotteryAbi from "../../abi/LotteryABI";
import makeTokens from "../../data/make_tokens";
/*

Call these two functions initially to check if lottery already drawed
viewCurrentLotteryId
viewUserInfoForLotterId -> to check whether already drawed a lottery


lottery number = reverse(number) + 10^7
lottery data will be fetched from view funcs


Step1: calculate lottery number
Step2: click on lottery then getAllowance then approve the contract with the Fildex token
Step3: Buy ticket

enum Status {
        Pending => 0,
        Open => 1,
        Close => 2,
        Claimable => 3,
    }

*/

export default function LotteryApp({ status, connect, account, ethereum }) {
  const [web3, setWeb3] = useState(null);
  const [lotteryId, setLotteryId] = useState("");
  const [showLotteryMessage, setShowLotteryMessage] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [number, setNumber] = useState(Math.floor(Math.random() * 1000000));
  const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [isUserAlreadyDrawed, setIsUserAlreadyDrawed] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("0");

  const [lotteryStatus, setLotteryStatus] = useState("1");

  useEffect(() => {
    if (ethereum !== null && web3 === null) {
      setWeb3(new Web3(ethereum));

      return;
    }

    if (web3 !== null || ethereum !== null) {
      const lotteryContract = makeLotteryContract(
        web3,
        lotteryAbi.abi,
        lotteryAbi.address
      );
      lotteryContract.viewCurrentLotteryId().then((value) => {
        setLotteryId(value);
        lotteryContract
          .viewUserInfoForLotteryId(account, value)
          .then((data) => {
            console.log(data);
            if (data[1] !== null && data[1].length !== 0) {
              setIsUserAlreadyDrawed(true);
              setTicketNumber(data[1]);
            } else if (data[1] === null || data[1].length === 0) {
              setIsUserAlreadyDrawed(false);
            }
          });

        lotteryContract.viewLottery(value).then((e) => {
          console.log("Final Number " + e["finalNumber"]);
          console.log("Status " + e["status"]);
          console.log("End Time " + e["endTime"]);
          setLotteryStatus(e["status"]);
        });
      });
    }
  }, [ethereum, web3, account]);

  const refresh = () => {
    setNumber(Math.floor(Math.random() * 1000000));
  };

  const onClick = async (e) => {
    const lotteryContract = makeLotteryContract(
      web3,
      lotteryAbi.abi,
      lotteryAbi.address
    );
    if (showSuccess) {
      setShowSuccess(false);
      setShowLotteryMessage(true);
      lotteryContract.viewLottery(lotteryId).then((e) => {
        console.log("Final Number " + e["finalNumber"]);
        console.log("Status " + e["status"]);
        console.log("End Time " + e["endTime"]);
        setLotteryStatus(e["status"]);
      });
      return;
    }

    if (showLotteryMessage) {
      setShowLotteryMessage(false);
      return;
    }

    // Confirm number
    const numberForSubmission = reverseNumber(number) + 1000000;

    setLoading(true);
    try {
      const tokens = await makeTokens(web3);

      const fildexToken = tokens.fDex;

      const fromTokenAllowance = await fildexToken.getAllowance(
        account,
        lotteryAbi.address
      );
      if (fromTokenAllowance <= 0) {
        setIsApprovalNeeded(true);
        return;
      } else {
        setIsApprovalNeeded(false);
      }

      const data = await lotteryContract.buyTickets(
        account,
        lotteryId,
        numberForSubmission
      );
      setShowSuccess(true);
      console.log(data);
    } catch (e) {
      setShowSuccess(false);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  async function approve() {
    setLoading(true);
    const tokens = await makeTokens(web3);

    const fildexToken = tokens.fDex;
    try {
      if (fildexToken === null) {
        console.log("From Token cannot be null");
        return;
      }

      const data = await fildexToken.approveContract(
        account,
        lotteryAbi.address,
        "1000000000000000000000"
      );
      console.log(data);
    } catch (e) {
      console.log("Failed Approval " + e);
    } finally {
      setLoading(false);
      getAllowance(fildexToken);
    }
  }

  async function getAllowance(token) {
    const fromTokenAllowance = await token.getAllowance(
      account,
      lotteryAbi.address
    );
    if (fromTokenAllowance <= 0) {
      setIsApprovalNeeded(true);
      return;
    } else {
      setIsApprovalNeeded(false);
    }
  }

  function reverseNumber(num) {
    // Initializing the result variable
    const ans = Number(String(num).split("").reverse().join(""));

    return ans;
  }

  return (
    <div className="flex flex-col items-center">
      {showSuccess ? (
        <LotterySuccess number={number} />
      ) : showLotteryMessage ? (
        <LotterMessage
          ticketNumber={ticketNumber}
          lotteryStatus={lotteryStatus}
        />
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

      {showSuccess ? (
        <button
          className="rounded-full bg-white px-20 py-3 text-xl"
          onClick={() => {
            setShowSuccess(false);
          }}
        >
          Return to lottery
        </button>
      ) : isLoading ? (
        <button className="rounded-full bg-loading-fill px-20 py-3 text-xl text-black">
          Submitting ...
        </button>
      ) : isUserAlreadyDrawed || lotteryStatus !== "1" ? (
        <div />
      ) : (
        <button
          className="rounded-full bg-white px-12 py-2 text-xl"
          onClick={isApprovalNeeded ? approve : onClick}
        >
          {isApprovalNeeded
            ? "Approve"
            : showSuccess
            ? "Return to lottery"
            : showLotteryMessage
            ? "Draw Lottery"
            : "Confirm Number"}
        </button>
      )}
    </div>
  );
}
