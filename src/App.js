import logo from './logo.svg';
import './App.css';
import MiNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3ReactProvider } from "@web3-react/core"
import Web3 from "web3"


const App = () => {

  function getLibrary(provider) {
    return new Web3(provider)
  }

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MiNavbar {...pageProps}/>
      </Web3ReactProvider>
    </>
  );
}

export default App;
