

![Solidity](https://img.shields.io/badge/solidity-yellow?style=for-the-badge&logo=solidity)
![Build Status](https://img.shields.io/badge/build-passing-green?style=for-the-badge&logo=build)
![JS](https://img.shields.io/badge/javascript-yellowgreen?style=for-the-badge&logo=javascript)
![React](https://img.shields.io/badge/react-blue?style=for-the-badge&logo=react)
![Hardhat](https://img.shields.io/badge/hardhat-important?style=for-the-badge&logo=hardhat)
![Swap](https://img.shields.io/badge/swap-orange?style=for-the-badge&logo=swap)
![Lottery](https://img.shields.io/badge/lottery-lightgrey?style=for-the-badge)
![Pool](https://img.shields.io/badge/pool-blueviolet?style=for-the-badge)
![Wrap](https://img.shields.io/badge/wrap%2Funwrap-9cf?style=for-the-badge)





<h3 align="center">https://fil-dex.vercel.app/</h3>
<img src="https://i.imgur.com/h9MhEuN.png" title="source: imgur.com" /></a>

## Overview


A DeFi application with AMM decentralised exchange and lottery built for FEVM.

<img src="https://i.imgur.com/4bFuENl.png" title="source: imgur.com" /></a>
<img src="https://i.imgur.com/c2yq7ET.png" title="source: imgur.com" /></a>



## Problem statement


At present, the Filecoin network already possesses a noticeable user base that holds FIL tokens as a valuable asset with minimal usability.


## Use cases

• To onboard other DeFi users on the FEVM for mass adoption. 

• Users on FEVM are able to exchange FIL for other tokens issued on-chain, and there is enough on-chain liquidity on the FEVM.

• To enable liquidity of governance tokens for Dao’s (like data Dao’s) and storage provider incentives.


## Key features


Core features include swapping, unwrapping and wrapping, supplying liquidity, and to incentivise – gamification features like lotteries

• Swap: Exchange any non-native and native tokens.

• Liquidity pools: Create or supply liquidity for token pairs of your choice and earn trading fees on it.

• Lottery: Gamification features to incentivise users and burn mechanism for FDEX token (Fildex utility token). You can win a lottery ticket as an incentive for swapping or buy lottery tickets using our FDEX token. You can choose a randomly generated 6-digit lottery number or re-roll the number to your choice. The lottery pool is distributed among the participants basis on the final number drawn and brackets matched. You will be informed via push notifications of your lottery results and can claim the prizes.

• Push Protocol: Notifications to provide better UX for use cases such as Swap successful/failed, Add liquidity and Lottery events.

## How it's Made

We used Openzepplin and Hardhat for smart contract development and FEVM deployment. React is being used to build an amazing DApp and smart contracts are plugged into DApp using web3.js Integrated Push protocol to alert users for transactions of Swap, Add liquidity, and Lottery events.


## Contract Addresses


Currently deployed on Hyperspace test net FVM

| Contract name    | Contract address                           |
| ---------------- | ------------------------------------------ |
| FSUD             | 0x9FB47Fa35ec3BFcE7DbcE3f490D1a389c3891a90 |
| FDAI             | 0x4cC33BD5d61791aC58a43A4f645256E7cc75ED1c |
| FDEX             | 0x4E4b516BCFC8EDc5028416Bd588371115b82b65e |
| wtFil            | 0x331e12FA9055EBC5F765c6a357D4eB3B1c7008cD |
| FilDex swap      | 0x7Ae1344EAAAe3B13136db444730E071682270004 |
| FilDex router    | 0xc64C4d67FE0c17d3f80BfAFDD42C3442c36c4b7A |
| FilDex factory   | 0x33961acE8247E175Da2635b6eB5d72a7513e6eF5 |
| FilDex lottery   | 0xB9925186B652d6a567B4CDfa2cD82957219C52b3 |
| Random generator | 0x59964E4c9D500DBc5Ddee715CbBDFA8FEC8F6ad4 |

