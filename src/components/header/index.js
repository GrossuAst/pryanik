import styles from './header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExitModal from '../modal/exit-modal';

const Header = ({ setLoggedIn, setModal, setElementInModal, isLoggedIn }) => {
    const location = useLocation();
    const loginPage = location.pathname === '/login';
    const mainPage = location.pathname === '/';

    const [username, setUsername] = useState(null);

    useEffect(() => {
        const user = getUsername();
        user && setUsername(user);
    }, [isLoggedIn]);

    function handleLogoutButtonClick() {
        setModal(true);
        setElementInModal(<ExitModal setModal={ setModal } setElementInModal={ setElementInModal } setLoggedIn={ setLoggedIn } setUsername={ setUsername } />);
    };

    function getUsername() {
        const token = localStorage.getItem('token');
        if(token) {
            const parts = token.split('_');
            const username = parts.find(part => part.startsWith('user'));
            if(username) {
                return username
            }
        }
        return
    };

    return (
        <header className={ styles.header }>
            <div className={ styles.container }>
                <div className={ styles.logo }>Pryaniky</div>
                <p className={ styles.username }>{ username && `${`Пользователь: ${username}`}` }</p>
            </div>
            { mainPage && <button className={ styles.logoutButton } onClick={ handleLogoutButtonClick }>Выйти из профиля</button> }
        </header>
    )
};

export default Header;