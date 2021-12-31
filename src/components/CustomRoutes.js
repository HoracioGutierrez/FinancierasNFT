import { Route, Redirect } from 'react-router-dom';
import useAuth from './hooks/useAuth';


export const PublicRoute = ({ component : Component , ...props }) => {
    const { user: { logged } } = useAuth()
    if(logged){
        return <Redirect to="/dashboard"/>
    }else{
        return <Route {...props} component={Component} />
    }
}

export const PrivateRoute = ({ component : Component , ...props }) => {
    const { user: { logged } } = useAuth()
    if(!logged){
        return <Redirect to="/"/>
    }else{
        return <Route {...props} component={Component} />
    }
}