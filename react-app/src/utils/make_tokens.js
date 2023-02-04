import tt1 from "../abi/TT1";
import makeTokenContract from "../contracts/TokenContract";

const tt2Address = "0x8D9Cf8B58fcF00Ead8550459778EBd8F188951E4";
export default function makeTokens(web3) {
  return Object.freeze({
    tt1: makeTokenContract(web3, tt1.abi, tt1.address),
    tt2: makeTokenContract(web3, tt1.abi, tt2Address),
  });
}
