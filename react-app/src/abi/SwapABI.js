const address = "0xD0e307585FC627d6e467616Eb16f5D6d1455fe75";

const SWAP_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wrappedToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token1Address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "token1Amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slippage",
        type: "uint256",
      },
    ],
    name: "addNativeTokenLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "nativeTokenAmountAdded",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "token1AmountAdded",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token0Address",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1Address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "token0Amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "token1Amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "slippage",
        type: "uint256",
      },
    ],
    name: "addNonNativeTokenLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "token0AmountAdded",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "token1AmountAdded",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "getAllowance",
    outputs: [
      {
        internalType: "uint256",
        name: "allowance",
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
        name: "tokenOutAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenInAmount",
        type: "uint256",
      },
    ],
    name: "getNativeQuote",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenOutAmount",
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
        name: "tokenInAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenOutAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenInAmount",
        type: "uint256",
      },
    ],
    name: "getQuote",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenOutAmount",
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
        name: "tokenOutAddress",
        type: "address",
      },
    ],
    name: "swapNativeToken",
    outputs: [
      {
        internalType: "uint256",
        name: "swapAmount",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenInAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenOutAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenInAmount",
        type: "uint256",
      },
    ],
    name: "swapNonNativeToken",
    outputs: [
      {
        internalType: "uint256",
        name: "swapAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

// TODO(someshubham): Checkout Namespace in JS
const swapABI = { abi: SWAP_ABI, address };
export default swapABI;
