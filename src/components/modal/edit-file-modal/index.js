import styles from './edit-file-modal.module.css';
import { formatDate } from '../../../utils/constants';
import { useForm } from '../../../hooks/useForm';
import { editEntry } from '../../../utils/api';

const EditFileModal = ({ element, initialData, setInitialData, setModal }) => {

    const { values, handleChange } = useForm({
        companySignatureName: element.companySignatureName,
        employeeSignatureName: element.employeeSignatureName,
        documentName: element.documentName,
        documentStatus: element.documentStatus,
        documentType: element.documentType,
        employeeNumber: element.employeeNumber,
        employeeSigDate: element.employeeSigDate,
        companySigDate: element.companySigDate
    });

    function handleSubmitForm(e) {
        e.preventDefault();
        editEntry(localStorage.getItem('token'), element.id, values)
            .then((res) => {
                setModal(false);
                const index = initialData.findIndex(item => item.id === element.id);
                const newInitialData = [
                    ...initialData.slice(0, index),
                    ...initialData.slice(index + 1),
                    res.data
                ];
                setInitialData(newInitialData);
            })
            .catch((err) => {

            })
            .finally(() => {

            })
    };

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return(
        <div className={ styles.container }>
            <h2 className={ styles.title }>Внесите изменения</h2>
            <div className={ styles.oldValues }>
                <p className={ styles.oldValue }>{ element.companySignatureName }</p>
                <p className={ styles.oldValue }>{ element.employeeSignatureName }</p>
                <p className={ styles.oldValue }>{ element.documentName }</p>
                <p className={ styles.oldValue }>{ element.documentStatus }</p>
                <p className={ styles.oldValue }>{ element.documentType }</p>
                <p className={ styles.oldValue }>{ element.employeeNumber }</p>
                <p className={ styles.oldValue }>{ formatDate(element.employeeSigDate) }</p>
                <p className={ styles.oldValue }>{ formatDate(element.companySigDate) }</p>
            </div>
            <form className={ styles.form } onSubmit={ handleSubmitForm }>
                <div className={ styles.newValues }>
                    <input  className={ styles.newValue } defaultValue={ values.companySignatureName } name='companySignatureName'  
                        onChange={ handleChange } required
                    />
                    <input className={ styles.newValue } defaultValue={ values.employeeSignatureName } name='employeeSignatureName' 
                        onChange={ handleChange } required
                    />
                    <input className={ styles.newValue } defaultValue={ values.documentName } name='documentName' 
                        onChange={ handleChange } required
                    />
                    <input className={ styles.newValue } defaultValue={ values.documentStatus } name='documentStatus' 
                        onChange={ handleChange } required
                    />
                    <input className={ styles.newValue } defaultValue={ values.documentType } name='documentType' 
                        onChange={ handleChange } required
                    />
                    <input className={ styles.newValue } defaultValue={ values.employeeNumber } name='employeeNumber' 
                        onChange={ handleChange } required
                    />
                    <input type="date" max={ getCurrentDate() } className={ styles.newValue } name='employeeSigDate' defaultValue={ values.employeeSigDate } 
                        onChange={ handleChange } required
                    />
                    <input type="date" max={ getCurrentDate() } className={ styles.newValue } name='companySigDate' defaultValue={ values.companySigDate } 
                        onChange={ handleChange } required
                    />
                </div>
                <button type='submit' className={ styles.button } >Сохранить</button>
            </form>
        </div>
    )
};

export default EditFileModal;