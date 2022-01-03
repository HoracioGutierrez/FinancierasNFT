import AuthProvider from './components/providers/AuthProvider';
import Web3Provider from './components/providers/Web3Provider';
import Layout from './components/layout/Layout';

const App = () => {

    return (
        <Web3Provider>
            <AuthProvider>
                <Layout />
            </AuthProvider>
        </Web3Provider>
    )
}

export default App