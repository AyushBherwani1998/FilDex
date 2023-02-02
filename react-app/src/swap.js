import Web3 from "web3";

const address = "0x5fD7752824d4F419ecf27597cD3bdBaB5e24af83";

const abi = [
  {
    inputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    name: "approveWethContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    name: "approveWethRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "checkAllowance",
    outputs: [
      { internalType: "uint256", name: "amount1", type: "uint256" },
      { internalType: "uint256", name: "amount2", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
    ],
    name: "swapMultiHopExactAmountIn",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutDesired", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
    ],
    name: "swapMultiHopExactAmountOut",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
    ],
    name: "swapSingleHopExactAmountIn",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOutDesired", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
    ],
    name: "swapSingleHopExactAmountOut",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    name: "transferWeth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function makeSwapContract(provider) {
  const web3 = new Web3(provider);
  const swapContract = new web3.eth.Contract(abi, address);
  return swapContract;
}
