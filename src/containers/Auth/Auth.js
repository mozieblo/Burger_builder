import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLenght: 6
                },
                valid: false,
                touched: false
            },
        }
    }

    checkValidity(value, rules) {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls })
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map( formEl => (
            <Input
                key={formEl.id} 
                elementType={formEl.config.elementType} 
                elementConfig={formEl.config.elementConfig} 
                value={formEl.config.value}
                invalid={!formEl.config.valid}
                shouldValidate={formEl.config.validation}
                touched={formEl.config.touched}
                changed={(event) => {this.inputChangedHandler(event, formEl.id)}} />
        ))
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;