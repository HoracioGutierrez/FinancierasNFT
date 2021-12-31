import { Route, Switch, useHistory } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../CustomRoutes';
import Start from '../pages/Start';
import Dashboard from '../pages/Dashboard';
import FintechList from '../pages/FintechList';
import MinterList from '../pages/MinterList';

const Main = () => {
    return (
        <main>
            <Switch>
                <PublicRoute exact path="/" component={Start} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/fintechlist" component={FintechList} />
                <PrivateRoute exact path="/minterlist" component={MinterList} />
            </Switch>
        </main>
    )
}

export default Main
