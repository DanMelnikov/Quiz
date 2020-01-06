import React from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {validateForm} from '../../form/formFramework';
import axios from 'axios';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const API_KEY = 'AIzaSyCix0VTwuPqMbwrT-062yXFinFsI8zw6UY';

export default class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    requiered: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    requiered: true,
                    minLength: 6
                }
            }
        }
    };
    
    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData);            
            console.log(response.data);
        } catch (error) {
            console.log(error);            
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData);            
            console.log(response.data);
        } catch (error) {
            console.log(error);            
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.requiered) {
            isValid = value.trim() !== '' && isValid;
        }
        
        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    changeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls, 
            isFormValid: validateForm(formControls)
        });
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key={index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => this.changeHandler(event, controlName)}
                />
            );
        });
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                        { this.renderInputs() }

                        <Button 
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>

                        <Button 
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}