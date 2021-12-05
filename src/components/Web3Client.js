import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import {Button} from "react-bootstrap"

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [ChainID, setChainID] = useState(null);	
	const [logInButtonText, setLogInButtonText] = useState('Log In')

	// whenever we connect to the wallet, run this code.
	useEffect(()=>{
		if (window.ethereum.isConnected()){
			// get ChainID
			getChainID();
		}
	}, [connButtonText])

	const getChainID = () => {
			window.ethereum.request({method: 'eth_chainId'})
			.then(result => {
				setChainID(result);
			});
	}

	const LogInHandler = () => {
		if (ChainID === '0x3') {
			console.log('Ropsten chain detected, proceed to login');
			const msg = 'Log Me In!';
			sendMessage(msg);
			
		} else {
			setErrorMessage('Please change chain to Ropsten to login');
			console.log(ChainID);
		}
	}

	const sendMessage = async (msg) => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			const signedMessage = await signer.signMessage(msg);

			if (ethers.utils.verifyMessage(msg, signedMessage) === defaultAccount) {
				console.log('Login Successful!');
				setLogInButtonText('Logged In!');
			} else {
				setErrorMessage('Log In Unsuccessful!');
			}
	}

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
        setDefaultAccount(result[0]);
				console.log(result[0])
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}

    // if (defaultAccount !== null) {
    //   return <p>defaultAccount</p>
    // } else {
    //   return <p>No default account</p>
    // }

    {defaultAccount !== null ? <p>defaultAccount</p> : <p>No default account</p>}

	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		// ethers.utils.getAddress returns a checksum address (mixed case)
		setDefaultAccount(ethers.utils.getAddress(newAccount));
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
	

  const miRender = () => {
    if (typeof defaultAccount == String(undefined) || defaultAccount.length > 1) {
      console.log(defaultAccount)
      return String({defaultAccount})
    } else {
      return <Button id="connect-wallet" onClick={connectWalletHandler}>Connect Wallet</Button>
    }
  }

	return (
    <div className='walletCard'>
      {/* <h4> {"Connection to MetaMask using window.ethereum methods"} </h4> */}
      {/* {{defaultAccount}.length > 0 ? {defaultAccount} : <Button id="connect-wallet" onClick={connectWalletHandler}>Connect Wallet</Button>} */}
      {/* {miRender()} */}
      {defaultAccount !== null ? <p className="address-meta">{defaultAccount}</p> : <Button id="connect-wallet" onClick={connectWalletHandler}>Connect Wallet</Button>}
      {/* <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
      <button onClick={LogInHandler}> {logInButtonText} </button> */}
    </div>
	);
}

export default WalletCard;