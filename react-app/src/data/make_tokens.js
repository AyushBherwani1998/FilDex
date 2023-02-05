import erc20ABI from "../abi/ERC20ABI";
import werc20Abi from "../abi/WERC20ABI";
import makeTokenContract from "../contracts/TokenContract";
import fileCoinLogo from "../assets/filcoin_logo.svg";

const tt1Address = "0x15d471748c0ec3255C1f17158729C989CAe0688E";
const tt2Address = "0x8D9Cf8B58fcF00Ead8550459778EBd8F188951E4";

const fUsdAddress = "0x9FB47Fa35ec3BFcE7DbcE3f490D1a389c3891a90";
const fUsdtAddress = "0x0F6B18b1883aF4e4D6310500736e46EBE35cABA9";
const fDexAddress = "0x360835e98f054fCBfC97fe6da0AfB1Ff435ce2BB";

export default function makeTokens(web3) {
  return Object.freeze({
    tt1: makeTokenContract(web3, erc20ABI.abi, tt1Address, {
      name: "TT1",
      logo: fileCoinLogo,
    }),
    tt2: makeTokenContract(web3, erc20ABI.abi, tt2Address, {
      name: "TT2",
      logo: fileCoinLogo,
    }),
    fUsd: makeTokenContract(web3, erc20ABI.abi, fUsdAddress, {
      name: "FUSD",
      logo: fileCoinLogo,
    }),
    fUsdt: makeTokenContract(web3, erc20ABI.abi, fUsdtAddress, {
      name: "FUSDT",
      logo: fileCoinLogo,
    }),
    fDex: makeTokenContract(web3, erc20ABI.abi, fDexAddress, {
      name: "FDEX",
      logo: fileCoinLogo,
    }),
    wtFil: makeTokenContract(web3, werc20Abi.abi, werc20Abi.wtFilAddress, {
      name: "WTFIL",
      logo: fileCoinLogo,
    }),
  });
}
