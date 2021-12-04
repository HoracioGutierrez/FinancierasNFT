import Web3 from 'web3';
import { InjectedConnector } from '@web3-react/injected-connector'


let isInitialized = false;

export const init = async () => {
	let provider = window.ethereum;

	if (typeof provider !== 'undefined') {
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
                document.getElementById("connect-wallet").innerHTML = selectedAccount;
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		});
	} else {
        console.log("esto no funciona")
    }

	const web3 = new Web3(provider);

	const networkId = await web3.eth.net.getId();

	isInitialized = true;

};


export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
