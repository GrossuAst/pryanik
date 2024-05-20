import styles from './not-found-page.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <section className={ styles.notFound }>
            <p className={ styles.error }>Ошибка 404</p>
            <p className={ styles.errorText }>
                Запрашиваемой страницы не существует. <br/>
                Возможно, она была удалена или в запросе был указан неверный адрес страницы. <br/>
                <Link to={'/'} className={ styles.link }>
                    Вернуться на главную
                </Link>
            </p>
        </section>
    )
};

export default NotFoundPage;