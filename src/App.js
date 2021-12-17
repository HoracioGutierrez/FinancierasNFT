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


const App = () => {

  const { authenticate, isAuthenticated, user } = useMoralis();
  
  const { logout, isAuthenticating } = useMoralis();

  return (
    <>
      <Router>
        {/* <MiNavbar/> */}
        {/* para logout */}
        {/* <div id="body" style={{backgroundColor: "#f0f2f5;"}}> */}
          {/* <button onClick={() => logout()} disabled={isAuthenticating}></button> */}
          <Switch>
            <Route exact path="/start" component={Start}/>
            <Route exact path="/marketplace" component={Prueba} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contract" component={Contract} />
            <Route exact path="/nftbalance" component={NFTBalance} />
          </Switch>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;