import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ onlyAuthorized = true, component, isLoggedIn }) => {
    if(onlyAuthorized && !isLoggedIn) {
        console.log('закрытый авторизацией роут');
        return <Navigate to='/login' />
    };

    if(!onlyAuthorized && isLoggedIn) {
        console.log('пусть скрыт от авторизованного пользователя');
        return <Navigate to='/' />
    }    

    return component;
};

export default ProtectedRoute;