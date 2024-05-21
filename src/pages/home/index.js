import styles from './home.module.css';
import Preloader from '../../components/preloader';
import AddFileModal from '../../components/modal/add-file-modal';

// в компонент home добавить разметку на случай ошибки сервера при получении списка

const Home = ({ initialData, setInitialData, setElementInModal, setModal, isLoading, serverError }) => {

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}.${month}.${year}`;
    }

    function handleAddButtonClick() {
        setElementInModal(<AddFileModal initialData={ initialData } setInitialData={ setInitialData } setModal={ setModal } setElementInModal={ setElementInModal } />);
        setModal(true);
    };
    
    return (
        <main className={ `${ styles.main } ${ isLoading && styles.preloaderContainer }` }>
            {
                isLoading ? <Preloader /> : 
                serverError ? <p>ошибка сервера</p> :
                (
                    <section>
                        <div className={ styles.tableHeader }>
                            <h2 className={ styles.title }>Список документов</h2>
                            <button className={ styles.addButton } onClick={ handleAddButtonClick }>Добавить запись</button>
                        </div>
                        <table className={ styles.table }>
                            <tbody className={ styles.tableBody }>
                                <tr className={ styles.row }>
                                    <td className={ `${styles.cell} ${styles.indexCell}` }>№</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Файл с подписью компании</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Файл с подписью сотрудника</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Название документа</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Статус документа</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Тип документа</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Номер сотрудника</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Дата подписания сотрудником</td>
                                    <td className={ `${styles.cell} ${styles.contentCell}` }>Дата подписания компанией</td>
                                    <td className={ `${styles.cell} ${styles.indexCell}` }></td>
                                    <td className={ `${styles.cell} ${styles.indexCell}` }></td>
                                </tr>
                                    {
                                        initialData && initialData.map((item, index) => (
                                            <tr key={ item.id } className={ styles.row }>
                                                <td className={ `${styles.cell} ${styles.indexCell}` }>{ index+1 }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.companySignatureName }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.employeeSignatureName }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.documentName }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.documentStatus }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.documentType }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.employeeNumber }</td>      
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ formatDate(item.employeeSigDate) }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ formatDate(item.companySigDate) }</td>
                                                <td className={ `${styles.cell} ${styles.indexCell}` }><div className={ styles.pen }></div></td>
                                                <td className={ `${styles.cell} ${styles.indexCell}` }><div className={ styles.trash }></div></td>
                                            </tr>
                                            
                                        ))
                                    }
                            </tbody>
                        </table>
                    </section>    
                )
            }
            
        </main>
    )
};

export default Home;