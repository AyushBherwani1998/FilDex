import erc20ABI from "../abi/ERC20ABI";
import werc20Abi from "../abi/WERC20ABI";
import makeTokenContract from "../contracts/TokenContract";
import fileCoinLogo from "../assets/filcoin_logo.svg";
import fusdLogo from "../assets/fusd_logo.svg";
import fDexLogo from "../assets/fDex_logo.svg";
import fDaiLogo from "../assets/fDAI_logo.svg";
import wtFilLogo from "../assets/wtFIL_logo.svg";
import FilDexConstants from "../Constants";

const fUsdAddress = "0x9FB47Fa35ec3BFcE7DbcE3f490D1a389c3891a90";
const fDaiAddress = "0x4E4b516BCFC8EDc5028416Bd588371115b82b65e";
const fDexAddress = "0x4cC33BD5d61791aC58a43A4f645256E7cc75ED1c";

export default function makeTokens(web3) {
  return Object.freeze({
    fUsd: makeTokenContract(web3, erc20ABI.abi, fUsdAddress, {
      name: "FUSD",
      logo: fusdLogo,
    }),
    fDai: makeTokenContract(web3, erc20ABI.abi, fDaiAddress, {
      name: "FDAI",
      logo: fDaiLogo,
    }),
    fDex: makeTokenContract(web3, erc20ABI.abi, fDexAddress, {
      name: "FDEX",
      logo: fDexLogo,
    }),
    wtFil: makeTokenContract(web3, werc20Abi.abi, werc20Abi.wtFilAddress, {
      name: "WTFIL",
      logo: wtFilLogo,
    }),
    tFil: makeTokenContract(web3, werc20Abi.abi, FilDexConstants.nativeContractAddress, {
      name: "TFIL",
      logo: fileCoinLogo,
    }),
  });
}
