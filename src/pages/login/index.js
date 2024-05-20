import styles from './login.module.css';
import { useForm } from '../../hooks/useForm';
import { login } from '../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
    const navigate = useNavigate();
    const { values, handleChange, errors, isValid, resetForm } = useForm({username: '', password: ''});
    const [isLoading, setLoading] = useState(false);
    const [responseError, setResponseError] = useState(null);

    function handleInputChange(e) {
        handleChange(e);
        setResponseError(null);
    };

    function handleSubmitForm(e) {
        e.preventDefault();
        setLoading(true);
        setResponseError(null);
        if(isValid) {
            login(values)
                .then((res) => {
                    if(res.data) {
                        setResponseError(null);
                        setLoading(false);
                        resetForm();
                        navigate('/', { replace: true });
                        setLoggedIn(true);
                        localStorage.setItem('token', res.data.token);
                    } else if(res.error_code === 2004) {
                        setResponseError('Введен неправильный пароль или имя.');
                    }
                })
                .catch((err) => {
                    setResponseError('Ошибка сервера. Попробуйте еще раз.');
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        return;
    };

    return (
        <main>
            <section className={ styles.loginSection }>
                <h2 className={ styles.title }>
                    Авторизуйтесь
                </h2>
                <form className={ styles.form } onSubmit={ handleSubmitForm } noValidate>
                    <div className={ styles.container }>
                        <p className={ styles.inputTitle }>Имя:</p>
                        <input 
                            className={ `${ styles.input  } ${ errors.username ? styles.errorInput : null }` }
                            placeholder='Имя пользователя'
                            name='username'
                            type='text'
                            value={ values.username }
                            onChange={ handleInputChange }
                            minLength={ 3 }
                            maxLength={ 10 }
                            required
                        />
                        <p className={ styles.errorMessage }>{ errors.username }</p>
                    </div>
                    <div className={ styles.container }>
                        <p className={ styles.inputTitle }>Пароль:</p>
                        <input 
                            className={ `${ styles.input  } ${ errors.password ? styles.errorInput : null }` }
                            placeholder='Пароль'
                            name='password'
                            type='password'
                            value={ values.password }
                            onChange={ handleInputChange }
                            minLength={ 3 }
                            maxLength={ 10 }
                            required
                            pattern="^[A-Za-z]+$"
                        />
                        <p className={ styles.errorMessage }>{ errors.password }</p> 
                    </div>
                    <div className={ styles.container }>
                        <button className={ `${styles.button} ${ !isValid || isLoading ? styles.errorButton : null }` } type='submit' disabled={ !isValid || isLoading } >
                            { !isLoading ? 'Войти' : 'Загрузка...' }
                        </button>
                        <p className={ styles.errorMessage }>{ responseError }</p> 
                    </div>
                </form>
            </section>
        </main>
    )
};

export default Login;