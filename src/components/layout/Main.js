import { Route, Switch, useHistory } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../CustomRoutes';
import Start from '../pages/Start';
import Dashboard from '../pages/Dashboard';

const Main = () => {
    return (
        <Switch>
            <PublicRoute exact path="/" component={Start} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/marketplace" component={Prueba} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/contract" component={Contract} />
            <Route exact path="/nftbalance" component={NFTBalance} />
            <Route exact path="/tablenft" component={TableNFT} />
            <Route exact path="/fintechlist" component={FintechList} />
            <Route exact path="/minterlist" component={MinterList} />
            <Route exact path="/test" component={Test} /> */}
        </Switch>
    )
}

export default Main
