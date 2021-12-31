import './App.css';
import { MetaMaskProvider } from "metamask-react";
import { MetamaskStateProvider } from "use-metamask";
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import AuthProvider from './components/providers/AuthProvider';
import Web3Provider from './components/providers/Web3Provider';
import Layout from './components/layout/Layout';

const App = () => {

    return (
        <MetamaskStateProvider>
            <MetaMaskProvider>
                <Web3Provider>
                    <AuthProvider>
                        <Layout/>
                    </AuthProvider>
                </Web3Provider>
            </MetaMaskProvider>
        </MetamaskStateProvider>
    )
}

export default App