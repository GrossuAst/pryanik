import styles from './delete-modal.module.css';
import Preloader from '../../preloader';
import { useState } from 'react';
import { deleteEntry } from '../../../utils/api';

const DeleteModal = ({ initialData, setInitialData, setModal, setElementInModal, setElementToDelete, elementToDelete }) => {
    const [isLoading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(false);

    function handleCancellButtonClick() {
        setModal(false);
        setElementInModal(null);
        setElementToDelete(null);
    };

    function handleDeleteButtonClick() {
        setModal(false);
        setElementInModal(null);
        setLoading(true);
        deleteEntry(localStorage.getItem('token'), elementToDelete.id)
            .then((res) => {
                setInitialData(initialData.filter((item) => item.id !== elementToDelete.id));
                setElementToDelete(null);
                setLoading(false);
            })
            .catch((err) => {
                setServerError(true);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            })
    };
    
    return (
        <div className={ styles.container }>
            {
                isLoading ? <Preloader /> :
                (   
                    <>
                        <h2 className={ styles.title }>Удалить запись?</h2>
                        <div className={ styles.buttonsContainer }>
                            <button className={ `${styles.button} ${styles.cancellButton}` } onClick={ handleCancellButtonClick }>Отмена</button>
                            <button className={ `${styles.button} ${styles.deleteButton}` } onClick={ handleDeleteButtonClick }>Удалить</button>
                        </div>
                    </>
                )
            }

        </div>
    )
};

export default DeleteModal;