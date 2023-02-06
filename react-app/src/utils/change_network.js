import web3 from "../web3";
async function changeNetwork(networkId) {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(networkId) }]
    });
}

export default changeNetwork;