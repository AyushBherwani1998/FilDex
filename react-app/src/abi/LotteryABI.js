const address = "0x1bee93c4b7122e4770edb3f79c5a4a31b5bd5db5";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_filDexTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_randomGeneratorAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AdminTokenRecovery",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "firstTicketIdNextLottery",
        type: "uint256",
      },
    ],
    name: "LotteryClose",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "injectedAmount",
        type: "uint256",
      },
    ],
    name: "LotteryInjection",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "finalNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "countWinningTickets",
        type: "uint256",
      },
    ],
    name: "LotteryNumberDrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceTicketInFDEX",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "firstTicketId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "injectedAmount",
        type: "uint256",
      },
    ],
    name: "LotteryOpen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "treasury",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "injector",
        type: "address",
      },
    ],
    name: "NewOperatorAndTreasuryAndInjectorAddresses",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "randomGenerator",
        type: "address",
      },
    ],
    name: "NewRandomGenerator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
    ],
    name: "TicketsClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "lotteryId",
        type: "uint256",
      },
    ],
    name: "TicketsPurchase",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_LENGTH_LOTTERY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_TREASURY_FEE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_LENGTH_LOTTERY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_ticketNumber",
        type: "uint32",
      },
    ],
    name: "buyTickets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ticketId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_bracket",
        type: "uint32",
      },
    ],
    name: "claimTickets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
    ],
    name: "closeLottery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentLotteryId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentTicketId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_autoInjection",
        type: "bool",
      },
    ],
    name: "drawFinalNumberAndMakeLotteryClaimable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "filDexToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "injectFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "injectorAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxNumberTicketsPerBuyOrClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "operatorAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingInjectionNextLottery",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "randomGenerator",
    outputs: [
      {
        internalType: "contract IRandomNumberGenerator",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_operatorAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasuryAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_injectorAddress",
        type: "address",
      },
    ],
    name: "setOperatorAndTreasuryAndInjectorAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_priceTicketInFDEX",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_discountDivisor",
        type: "uint256",
      },
      {
        internalType: "uint256[6]",
        name: "_rewardsBreakdown",
        type: "uint256[6]",
      },
      {
        internalType: "uint256",
        name: "_treasuryFee",
        type: "uint256",
      },
    ],
    name: "startLottery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasuryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewCurrentLotteryId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
    ],
    name: "viewLottery",
    outputs: [
      {
        components: [
          {
            internalType: "enum FilDexLottery.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "priceTicketInFDEX",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "discountDivisor",
            type: "uint256",
          },
          {
            internalType: "uint256[6]",
            name: "rewardsBreakdown",
            type: "uint256[6]",
          },
          {
            internalType: "uint256",
            name: "treasuryFee",
            type: "uint256",
          },
          {
            internalType: "uint256[6]",
            name: "fdexPerBracket",
            type: "uint256[6]",
          },
          {
            internalType: "uint256[6]",
            name: "countWinnersPerBracket",
            type: "uint256[6]",
          },
          {
            internalType: "uint256",
            name: "firstTicketId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "firstTicketIdNextLottery",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountCollectedInFDEX",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "finalNumber",
            type: "uint32",
          },
        ],
        internalType: "struct FilDexLottery.Lottery",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ticketIds",
        type: "uint256[]",
      },
    ],
    name: "viewNumbersAndStatusesForTicketIds",
    outputs: [
      {
        internalType: "uint32[]",
        name: "",
        type: "uint32[]",
      },
      {
        internalType: "bool[]",
        name: "",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ticketId",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_bracket",
        type: "uint32",
      },
    ],
    name: "viewRewardsForTicketId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_lotteryId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_cursor",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_size",
        type: "uint256",
      },
    ],
    name: "viewUserInfoForLotteryId",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint32[]",
        name: "",
        type: "uint32[]",
      },
      {
        internalType: "bool[]",
        name: "",
        type: "bool[]",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const lotteryABI = { address, abi };

export default lotteryABI;
