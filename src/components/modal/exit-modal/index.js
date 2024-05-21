import styles from './exit-modal.module.css';
import { useNavigate } from 'react-router-dom';

const ExitModal = ({ setModal, setElementInModal, setLoggedIn, setUsername }) => {
    const navigate = useNavigate();

    function handleCancellButtonClick() {
        setModal(false);
        setElementInModal(null);
    };

    function handleExitButtonClick() {
        const token = localStorage.getItem('token');
        token && localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/login', { replace: true });
        setModal(false);
        setElementInModal(null);
        setUsername(null);
    };
    
    return (
        <div className={ styles.container }>
            <h2 className={ styles.title }>Выйти из профиля?</h2>
            <div className={ styles.buttonsContainer }>
                <button className={ `${styles.button} ${styles.cancellButton}` } onClick={ handleCancellButtonClick }>Отмена</button>
                <button className={ `${styles.button} ${styles.exitButton}` } onClick={ handleExitButtonClick }>Выйти</button>
            </div>
        </div>
    )
};

export default ExitModal;