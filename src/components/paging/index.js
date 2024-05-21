import styles from './paging.module.css';

const Paging = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className={ styles.container }>
            <p>страница <span>{ currentPage }</span> из <span>{ totalPages }</span></p>
            <div className={ styles.arrows }>
                <div className={ `${styles.arrow} ${styles.leftArrow}` } onClick={ () => handlePageChange(currentPage - 1) }></div>
                
                <p className={ styles.numer }>
                    { currentPage }    
                </p>     

                <div className={ `${styles.arrow} ${styles.rightArrow}`} onClick={ () => handlePageChange(currentPage + 1) }></div>
            </div>
        </div>
    )
};

export default Paging;