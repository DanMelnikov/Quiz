import React from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import {createControl, validate, validateForm} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import { createQuizFinish, createQuizQuestion } from '../../redux/actions/creator';

function createOptionControl(optionNumber) {
    return createControl({
        label: `Вариант ${optionNumber}`,
        errorMessage: 'Значение не может быть пустым',
        id: optionNumber
    }, { required: true });
}

function createFormControls() {
    return {
        // quizName: createControl({
        //     label: "Введите название теста",
        //     errorMessage: 'Название не может быть пустым'
        // }, { required: true }),
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {
    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault();
    }

    addQuestionHandler = () => {
        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            id: this.props.quiz.length + 1,
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
    }

    createQuizHandler = () => {
        this.props.createQuizFinish();
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        });
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={index}>
                    <Input
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null }
                </React.Fragment>
            );
        });
    }

    render() {
        const select = <Select 
            label='Выберите правильный ответ'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 }
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        
                        { this.renderInputs() }
                        
                        { select }

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.creator.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizFinish: () => dispatch(createQuizFinish()),
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(QuizCreator);