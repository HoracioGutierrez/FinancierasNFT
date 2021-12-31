import './App.css';
import { MetaMaskProvider } from "metamask-react";
import { MetamaskStateProvider } from "use-metamask";
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import AuthProvider from './components/providers/AuthProvider';
import Web3Provider from './components/providers/Web3Provider';

const App = () => {

    return (
        <MetamaskStateProvider>
            <MetaMaskProvider>
                <Web3Provider>
                    <AuthProvider>
                        <Header />
                        <Main />
                    </AuthProvider>
                </Web3Provider>
            </MetaMaskProvider>
        </MetamaskStateProvider>
    )
}

export default App