import styles from './app.module.css';
import { login, getData, createEntry } from '../../utils/api';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import ProtectedRoute from '../protected-route';
import Header from '../header';
import Home from '../../pages/home';
import Login from '../../pages/login';
import NotFoundPage from '../../pages/not-found-page';
import Modal from '../modal';

const App = () => {
    const location = useLocation();
    const mainPage = location.pathname === '/';
    const loginPage = location.pathname === '/login';

    const [isLoggedIn, setLoggedIn] = useState(true);
    const [initialData, setInitialData] = useState(null);

    const [isModalOpen, setModal] = useState(false);
    const [elementInModal, setElementInModal] = useState(null);

    useEffect(() => {
        login()
            .then((res) => {
                
            })
            .catch((err) => {
                // console.log(err);
            })
    }, []);

    useEffect(() => {
        getData('supersecrettoken_for_user1')
            .then((res) => {
                setInitialData(res.data);
            })
            .catch((err) => {
                // console.log(err)
            })
    }, []);

    useEffect(() => {
        createEntry()
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                // console.log(err)
            })
    }, []);

    function handleCloseModal() {
        setModal(false);
        setElementInModal(null);
    };

    return (
        <>     
            <div className={ styles.wrapper }>

                { mainPage || loginPage ? <Header /> : <></> }

                <Routes>
                    
                    <Route path='/' 
                        element={ 
                            <ProtectedRoute onlyAuthorized={ true } isLoggedIn={ isLoggedIn }
                                component={ 
                                    <Home
                                        initialData={ initialData }
                                        setElementInModal={ setElementInModal }
                                        setModal={ setModal }
                                    />
                                }
                            /> 
                        }
                    />

                    <Route path='/login' element={ <ProtectedRoute onlyAuthorized={ false } component={ <Login /> } isLoggedIn={ isLoggedIn } /> } />

                    <Route path='*' element={ <NotFoundPage /> } />

                </Routes>

            </div>
            
            <Modal isModalOpen={ isModalOpen } handleCloseModal={ handleCloseModal } /> 
        </>
    )
};

export default App;