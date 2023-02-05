import erc20ABI from "../abi/ERC20ABI";
import werc20Abi from "../abi/WERC20ABI";
import makeTokenContract from "../contracts/TokenContract";
import fileCoinLogo from "../assets/filcoin_logo.svg";
import FilDexConstants from "../Constants";

const tt1Address = "0x15d471748c0ec3255C1f17158729C989CAe0688E";
const tt2Address = "0x8D9Cf8B58fcF00Ead8550459778EBd8F188951E4";

const fUsdAddress = "0x9FB47Fa35ec3BFcE7DbcE3f490D1a389c3891a90";
const fUsdtAddress = "0x0F6B18b1883aF4e4D6310500736e46EBE35cABA9";
const fDexAddress = "0x4cC33BD5d61791aC58a43A4f645256E7cc75ED1c";

const daiAddress = "0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33";

export default function makeTokens(web3) {
  return Object.freeze({
    dai: makeTokenContract(web3, erc20ABI.abi, daiAddress, {
      name: "DAI",
      logo: fileCoinLogo,
    }),

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
    tFil: makeTokenContract(
      web3,
      werc20Abi.abi,
      FilDexConstants.nativeContractAddress,
      {
        name: "TFIL",
        logo: fileCoinLogo,
      }
    ),
  });
}
