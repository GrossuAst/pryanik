import styles from './app.module.css';
import { getData } from '../../utils/api';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import ProtectedRoute from '../protected-route';
import Header from '../header';
import Home from '../../pages/home';
import Login from '../../pages/login';
import NotFoundPage from '../../pages/not-found-page';
import Modal from '../modal';

// в компонент home добавить разметку на случай ошибки сервера при получении списка
// в модалку добавления записи добавить разметку на случай ошибки сервера 

const App = () => {
    const location = useLocation();
    const mainPage = location.pathname === '/';
    const loginPage = location.pathname === '/login';

    const [isLoading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [initialData, setInitialData] = useState(null);

    const [isModalOpen, setModal] = useState(false);
    const [elementInModal, setElementInModal] = useState(null);

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if(isLoggedIn) {
            setLoading(true);
            getData(localStorage.getItem('token'))
                .then((res) => {
                    setInitialData(res.data);
                })
                .catch((err) => {
                    setServerError(true);
                })
                .finally(() =>{
                    setLoading(false);
                })
        };
    }, [isLoggedIn]);

    function handleCloseModal() {
        setModal(false);
        setElementInModal(null);
    };

    function checkToken() {
        const token = localStorage.getItem('token');
        if(token) {
            setLoggedIn(true);
        };
    };

    return (
        <>     
            <div className={ styles.wrapper }>

                { mainPage || loginPage ? <Header setLoggedIn={ setLoggedIn } setModal={ setModal } setElementInModal={ setElementInModal } isLoggedIn={ isLoggedIn } /> : <></> }

                <Routes>
                    
                    <Route path='/' 
                        element={ 
                            <ProtectedRoute onlyAuthorized={ true } isLoggedIn={ isLoggedIn }
                                component={
                                    <Home
                                        initialData={ initialData }
                                        setInitialData={ setInitialData }
                                        setElementInModal={ setElementInModal }
                                        setModal={ setModal }
                                        isLoading={ isLoading }
                                        serverError={ serverError }
                                    />
                                }
                            /> 
                        }
                    />

                    <Route path='/login' 
                        element={ 
                            <ProtectedRoute onlyAuthorized={ false } isLoggedIn={ isLoggedIn } 
                                component={ 
                                    <Login 
                                        setLoggedIn={ setLoggedIn }
                                    /> 
                                } 
                            /> 
                        } 
                    />

                    <Route path='*' element={ <NotFoundPage /> } />

                </Routes>

            </div>
            
            <Modal isModalOpen={ isModalOpen } handleCloseModal={ handleCloseModal } elementInModal={ elementInModal } />
        </>
    )
};

export default App;