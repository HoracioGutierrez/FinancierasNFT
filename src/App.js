import './App.css';
import MiNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useMoralis } from "react-moralis";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Prueba from './components/Prueba';
import Login from './components/Login';
import Contract from "./components/Contract"
import NFTBalance from "./components/NFTBalance";
import Start from './components/Start';
import TableNFT from './components/TableNFT';
import FintechList from './components/FintechList';
import MinterList from './components/MinterList';
import Test from './components/test';
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
</style>


const App = () => {
  
  const { authenticate, isAuthenticated, user } = useMoralis();
  
  const { logout, isAuthenticating } = useMoralis();

  const startComp = () => { 
    return <Route exact path="/start" component={Start}/>
  }
  const pruebaComp = () => { 
    return <Route exact path="/" component={Prueba}/>
  }
  
  

  return (
    <>
      <Router>
         {/* <MiNavbar/>  */}
        {/* para logout */}
        {/* <div id="body" style={{backgroundColor: "#f0f2f5;"}}> */}
          {/* <button onClick={() => logout()} disabled={isAuthenticating}></button> */}
          <Switch>
            <Route exact path="/start" component={Start}/>
            <Route exact path="/marketplace" component={Prueba} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contract" component={Contract} />
            <Route exact path="/nftbalance" component={NFTBalance} />
            <Route exact path="/tablenft" component={TableNFT} />
            <Route exact path="/fintechlist" component={FintechList} />
            <Route exact path="/minterlist" component={MinterList} />
            <Route exact path="/test" component={Test} />
          </Switch>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;