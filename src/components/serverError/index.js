import styles from './server-error.module.css';

const ServerError = ({ getInitialData }) => {
    return (
        <div className={ styles.container }>
            <h2 className={ styles.title }>Во время загрузки произошла ошибка</h2>
            <p className={ styles.retry } onClick={ () => getInitialData() }>Повторить попытку</p>
        </div>
    )
};

export default ServerError;