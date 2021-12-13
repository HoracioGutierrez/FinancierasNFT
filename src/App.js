import './App.css';
import MiNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMoralis } from "react-moralis";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Prueba from './components/Prueba';


const App = () => {

  const { authenticate, isAuthenticated, user } = useMoralis();
  
  const { logout, isAuthenticating } = useMoralis();

  return (
    <>
      <Router>
        <MiNavbar/>
        {/* para logout */}
        <div id="body" style={{backgroundColor: "#f0f2f5;"}}>
          <button onClick={() => logout()} disabled={isAuthenticating}></button>
          <Switch>
            <Route exact path="/marketplace" component={Prueba} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
