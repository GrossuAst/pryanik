import styles from './add-file-modal.module.css';
import { useForm } from '../../../hooks/useForm';
import { createEntry } from '../../../utils/api';
import { useState } from 'react';
import Preloader from '../../preloader';

const AddFileModal = ({ initialData, setInitialData, setModal, setElementInModal }) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { values, handleChange, errors, isValid, resetForm } = useForm({
        companySigDate: '', 
        companySignatureName: '', 
        documentName: '', 
        documentStatus: '', 
        documentType: '', 
        employeeNumber: '', 
        employeeSigDate: '', 
        employeeSignatureName: ''
    });

    function handleSubmitForm(e) {
        e.preventDefault();
        if(isValid) {
            const token = localStorage.getItem('token');
            setLoading(true);
            setError(false);
            createEntry(token, values)
                .then((res) => {
                    setInitialData([...initialData, res.data]);
                    setModal(false);
                    setElementInModal(null);
                    resetForm();
                    setLoading(false);
                    setError(false);
                })
                .catch((err) => {
                    console.log(err);
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                })
        };
    };

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <form className={ `${styles.form} ${ isLoading && styles.proloaderContainer }` } noValidate onSubmit={ handleSubmitForm }>
            {
                isLoading ? <Preloader /> :
                (
                    <>
                        <h2 className={ styles.title }>Добавить запись</h2>
                        <div className={ styles.inputs }>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Файл с подписью компании:</p>
                                    <input className={ `${styles.input} ${errors.companySignatureName && styles.errorInput}` } placeholder='Файл с подпись компании' name='companySignatureName' 
                                        required minLength={ 2 } maxLength={ 15 } type='text'
                                        onChange={ handleChange }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.companySignatureName }</p>
                            </div>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Файл с подписью сотрудника:</p>
                                    <input className={ `${styles.input} ${errors.employeeSignatureName && styles.errorInput}` } placeholder='Файл с подпись сотрудника' name='employeeSignatureName'
                                        required minLength={ 2 } maxLength={ 15 } type='text'
                                        onChange={ handleChange }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.employeeSignatureName }</p>
                            </div>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Название документа:</p>
                                    <input className={ `${styles.input} ${errors.documentName && styles.errorInput}` } placeholder='Название документа' name='documentName'
                                        required minLength={ 2 } maxLength={ 15 } type='text'
                                        onChange={ handleChange }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.documentName }</p>
                            </div>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Статус документа:</p>
                                    <input className={ `${styles.input} ${errors.documentStatus && styles.errorInput}` } placeholder='Статус документа' name='documentStatus'
                                        required minLength={ 2 } maxLength={ 15 } type='text'
                                        onChange={ handleChange }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.documentStatus }</p>
                            </div>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Тип документа:</p>
                                    <input className={ `${styles.input} ${errors.documentType && styles.errorInput}` } placeholder='Тип документа' name='documentType'
                                        required minLength={ 2 } maxLength={ 15 } type='text'
                                        onChange={ handleChange }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.documentType }</p>
                            </div>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Номер сотрудника:</p>
                                    <input className={ `${styles.input} ${errors.employeeNumber && styles.errorInput}` } placeholder='Номер сотрудника' name='employeeNumber'
                                        required minLength={ 1 } maxLength={ 15 } type='text'
                                        onChange={ handleChange }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.employeeNumber }</p>
                            </div>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Дата подписания сотрудником:</p>
                                    <input className={ `${styles.input} ${errors.employeeSigDate && styles.errorInput}` } placeholder='Дата подписания сотрудником' name='employeeSigDate'
                                        required
                                        onChange={ handleChange }
                                        type="date"
                                        max={ getCurrentDate() }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.employeeSigDate }</p>
                            </div>
                            <div className={ styles.inputContainer }>
                                <div className={ styles.wrapper }>
                                    <p className={ styles.inputTitle }>Дата подписания компанией:</p>
                                    <input className={ `${styles.input} ${errors.companySigDate && styles.errorInput}` } placeholder='Дата подписания компанией' name='companySigDate'
                                        required
                                        onChange={ handleChange }
                                        type="date"
                                        max={ getCurrentDate() }
                                    />
                                </div>
                                <p className={ styles.errorText }>{ errors.companySigDate }</p>
                            </div>
                        </div>
                        <button className={ `${styles.addButton} ${!isValid && styles.disabledAddButton}` } type='submit'>Добавить</button>
                        <p className={ styles.errorText }>{ error && 'Произошла ошибка. Попробуйте еще раз'}</p>
                    </>
                )
            }
        </form>
    )
};

export default AddFileModal;