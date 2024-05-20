import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ onlyAuthorized = true, component, isLoggedIn }) => {
    if(onlyAuthorized && !isLoggedIn) {
        return <Navigate to='/login' />
    };

    if(!onlyAuthorized && isLoggedIn) {
        return <Navigate to='/' />
    }    

    return component;
};

export default ProtectedRoute;