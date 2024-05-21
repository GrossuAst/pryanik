import styles from './modal.module.css';
import ReactDOM from "react-dom";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ elementInModal, isModalOpen, handleCloseModal }) => {
    function handleOverlayClick(e) {
        const overlayClass = styles.overlay;    
        const target = e.target;
        if(target.classList.contains(overlayClass)) {
            handleCloseModal();
        }
    };

    function handleCloseIconClick() {
        handleCloseModal();
    };

    return modalRoot ? ReactDOM.createPortal(
        (
            <div className={ `${styles.overlay} ${ isModalOpen && styles.overlayActive }` } onClick={ handleOverlayClick }>
                <div className={ styles.closeButton } onClick={ handleCloseIconClick }></div>
                { elementInModal }
            </div>
        ), modalRoot
    ) : null;
};

export default Modal;