import './App.css';
import MiNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Prueba from './components/Prueba';
import Login from './components/Login';
import Contract from "./components/Contract"
import NFTBalance from "./components/NFTBalance";
import Start from './components/Start';
import TableNFT from './components/TableNFT';
import FintechList from './components/FintechList';
import MinterList from './components/MinterList';
import {Redirect} from 'react-router-dom';
import {useEffect} from 'react';
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
</style>

export const LayoutConNavbar = ({children}) => {

  const {isWeb3Enabled,enableWeb3,isWeb3EnableLoading,authenticate,isAuthenticating,isAuthenticated} = useMoralis();
  console.group("Render")
  console.log("WEB3 Enabled : ",isWeb3Enabled)
  console.log("WEB3 Loading",isWeb3EnableLoading)
  console.log("Authenticated : ",isAuthenticated)
  console.log("Authenticating : ",isAuthenticating)
  
  
  /* useEffect(()=>{
    if(!isWeb3Enabled){
      enableWeb3()
    }
  },[]) */

  // return "Layout con navbar"

  /*
    sin metamask : false - false - true - false (aparece como ya autenticado)
    con metamask : false - false - false - false ()
    
  */

  if (isWeb3Enabled && !isWeb3EnableLoading) {
    console.log("True")
    return <Redirect to="/marketplace" />
  } else {
    console.log("False")
    return (
      <>
        <MiNavbar />
        {children}
      </>
    )
    //} 
  }
}

/* const RutaConNavbar = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>
      <MiNavbar />
      <Component {...props} />
    </Route>
  )
}
 */


const App = () => {
  const { web3, authenticate, isAuthenticated, isWeb3Enabled,enableWeb3, user, logout, isAuthenticating, isWeb3EnableLoading } = useMoralis();


  if (isWeb3Enabled && !isWeb3EnableLoading) {
    console.log("True")
    return <Router><Redirect to="/marketplace" /><Switch> <Route exact path="/marketplace" component={Prueba} /></Switch></Router>
  }

  return (
    <>
      <Router>
        {/* <MiNavbar /> */}
        {/* para logout */}
        {/* <button onClick={() => logout()} disabled={isAuthenticating}></button> */}
        <Switch>
          {/* <RutaConNavbar exact path="/start" component={Start} /> */}
          {/* <LayoutConNavbar exact path="/start" component={Start} /> */}
          <Route exact path="/start" component={Start} />
          <Route exact path="/marketplace" component={Prueba} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contract" component={Contract} />
          <Route exact path="/nftbalance" component={NFTBalance} />
          <Route exact path="/tablenft" component={TableNFT} />
          <Route exact path="/fintechlist" component={FintechList} />
          <Route exact path="/minterlist" component={MinterList} />
        </Switch>
      </Router>
    </>
  );
}

export default App;