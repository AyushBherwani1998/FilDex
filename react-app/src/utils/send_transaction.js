import sendNotification from "../push/send_notification";
import web3 from "../web3";

function send(transaction) {
    web3.eth.sendTransaction(transaction).on('receipt', function (receipt) {
        let title = receipt.status ? "Transaction is successful" : "Transaction failed";
        let body = receipt.from + ' to ' + receipt.to;
        let cta = `https://goerli.etherscan.io/tx/${receipt.transactionHash}`;
        sendNotification(title, body, transaction.from, cta);
    });
}

export default send;