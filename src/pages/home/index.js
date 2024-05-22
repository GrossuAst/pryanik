import styles from './home.module.css';
import { useState } from 'react';
import Preloader from '../../components/preloader';
import ServerError from '../../components/serverError';
import AddFileModal from '../../components/modal/add-file-modal';
import DeleteModal from '../../components/modal/delete-modal';
import EditFileModal from '../../components/modal/edit-file-modal';
import Paging from '../../components/paging';
import { formatDate } from '../../utils/constants';

const Home = ({ getInitialData, initialData, setInitialData, setElementInModal, setModal, isLoading, serverError }) => {
    const [elementToDelete, setElementToDelete] = useState(null);
    const [elementToEdit, setElementToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    function handleEditButtonClick(element) {
        setModal(true);
        setElementToEdit(element);
        setElementInModal(
            <EditFileModal  
                element={ element }
                initialData={ initialData }
                setInitialData={ setInitialData }
                setModal={ setModal }
            />
        );
    };

    function handleDeleteButtonClick(element) {
        setModal(true);
        setElementToDelete(element);
        setElementInModal(
            <DeleteModal 
                initialData={ initialData }
                setInitialData={ setInitialData }
                setModal={ setModal }
                setElementInModal={ setElementInModal }
                setElementToDelete={ setElementToDelete }
                elementToDelete={ element }
            />
        );
    };

    function handleAddButtonClick() {
        setElementInModal(
            <AddFileModal 
                initialData={ initialData } 
                setInitialData={ setInitialData } 
                setModal={ setModal } 
                setElementInModal={ setElementInModal } 
            />
        );
        setModal(true);
    };

    function handlePageChange(page) {
        if (page < 1 || page > totalPages) {
            return;
        }
        setCurrentPage(page);
    };

    function getPageData() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return initialData.slice(startIndex, endIndex);
    };

    const totalPages = initialData && Math.ceil(initialData.length / itemsPerPage);
    
    return (
        <main className={ `${ styles.main } ${ isLoading && styles.preloaderContainer }` }>
            {
                isLoading ? <Preloader /> : 
                serverError ? <ServerError getInitialData={ getInitialData } /> :
                (
                    <section>
                        <div className={ styles.tableHeader }>
                            <h2 className={ styles.title }>Список документов <span className={ styles.number }>(всего: { initialData.length })</span></h2>
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
                                        initialData && getPageData().map((item, index) => (
                                            <tr key={ item.id } className={ styles.row }>
                                                <td className={ `${styles.cell} ${styles.indexCell}` }>{ (currentPage - 1) * itemsPerPage + index + 1 }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.companySignatureName }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.employeeSignatureName }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.documentName }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.documentStatus }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.documentType }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ item.employeeNumber }</td>      
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ formatDate(item.employeeSigDate) }</td>
                                                <td className={ `${styles.cell} ${styles.contentCell}` }>{ formatDate(item.companySigDate) }</td>
                                                <td className={ `${styles.cell} ${styles.indexCell}` } onClick={ () => handleEditButtonClick(item) } ><div className={ styles.pen }></div></td>
                                                <td className={ `${styles.cell} ${styles.indexCell}` } onClick={ () => handleDeleteButtonClick(item) } ><div className={ styles.trash }></div></td>
                                            </tr>
                                            
                                        ))
                                    }
                            </tbody>
                        </table>
                        <Paging totalPages={ totalPages } currentPage={ currentPage } handlePageChange={ handlePageChange } />
                    </section>    
                )
            }
            
        </main>
    )
};

export default Home;