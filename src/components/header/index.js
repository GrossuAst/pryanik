import styles from './header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const loginPage = location.pathname === '/login';
    const mainPage = location.pathname === '/';

    function logout() {
        const token = localStorage.getItem('token');
        token && localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/login', { replace: true });
    };

    return (
        <header className={ styles.header }>
            <div className={ styles.logo }>Logo</div>
            { mainPage && <button className={ styles.logoutButton } onClick={ logout }>Выйти из профиля</button> }
        </header>
    )
};

export default Header;