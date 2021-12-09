import './App.css';
import MiNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMoralis } from "react-moralis";


const App = () => {

  const { authenticate, isAuthenticated, user } = useMoralis();
  
  const { logout, isAuthenticating } = useMoralis();

  return (
    <>
        <MiNavbar/>
        {/* para logout */}
        <div id="body" style={{backgroundColor: "#f0f2f5;"}}>
          <button onClick={() => logout()} disabled={isAuthenticating}></button>
        </div>
    </>
  );
}

export default App;
