import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends React.Component {
    state = {
        isFinished: false,
        activeQuestion: 0,
        activeState: null,  //{ answerId: 'success' || 'error' }
        quiz: [
            {
                question: 'Назовите дату окончания Второй мировой войны',
                rightAnswerId: 3,
                answers: [
                    {text: '1 мая 1945', id: 1},
                    {text: '9 мая 1945', id: 2},
                    {text: '2 сентября 1945', id: 3},
                    {text: '1 сентября 1941', id: 4},
                ]
            },
            {
                question: 'Назовите столицу Лихтенштейна',
                rightAnswerId: 2,
                answers: [
                    {text: 'Берлин', id: 1},
                    {text: 'Вадуц', id: 2},
                    {text: 'Москва', id: 3},
                    {text: 'Лихтенштейн', id: 4},
                ]
            }
        ]
    };

    answerClickHandler = answerId => {
        if (this.state.activeState) {
            const key = Object.keys(this.state.activeState)[0];
            if (this.state.activeState[key] === 'success') return;
        }

        if (this.state.quiz[this.state.activeQuestion].rightAnswerId === answerId) {
            this.setState({
                activeState: { [answerId]: 'success' }
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        activeState: null
                    });
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            this.setState({
                activeState: { [answerId]: 'error' }
            });
        }
    };

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                        ? <h1>Finished!</h1>
                        : <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick={this.answerClickHandler.bind(this)}
                            quizLength={this.state.quiz.length}
                            activeQuestion={this.state.activeQuestion + 1}
                            state={this.state.activeState}
                        />
                    }                    
                </div>
            </div>
        );
    }
}

export default Quiz;