import styles from './header.module.css';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const loginPage = location.pathname === '/login';
    const mainPage = location.pathname === '/';

    return (
        <header className={ styles.header }>
            <div className={ styles.logo }>Logo</div>
            { mainPage && <button className={ styles.logoutButton }>Выйти из профиля</button> }
        </header>
    )
};

export default Header;