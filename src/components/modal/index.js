import styles from './modal.module.css';
import ReactDOM from "react-dom";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, isModalOpen, handleCloseModal }) => {
    function handleOverlayClick(e) {
        const overlayClass = styles.overlay;    
        const target = e.target;
        if(target.classList.contains(overlayClass)) {
            handleCloseModal();
        }
    };

    return modalRoot ? ReactDOM.createPortal(
        (
            <div className={ `${styles.overlay} ${ isModalOpen && styles.overlayActive }` } onClick={ handleOverlayClick }>
                { children }
            </div>
        ), modalRoot
    ) : null;
};

export default Modal;