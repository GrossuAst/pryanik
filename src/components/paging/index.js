import styles from './paging.module.css';

const Paging = ({ totalPages, currentPage, handlePageChange }) => {
    return (
        <div className={ styles.container }>
            <p className={ styles.page }>страница <span className={ styles.pageNumber }>{ currentPage }</span> из <span className={ styles.pageNumber }>{ totalPages }</span></p>
            <div className={ styles.arrows }>
                <div className={ `${styles.arrow} ${styles.leftArrow}` } onClick={ () => handlePageChange(currentPage - 1) }></div>
                
                <p className={ styles.number }>
                    { currentPage }    
                </p>     

                <div className={ `${styles.arrow} ${styles.rightArrow}`} onClick={ () => handlePageChange(currentPage + 1) }></div>
            </div>
        </div>
    )
};

export default Paging;