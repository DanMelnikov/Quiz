import React from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

class Quiz extends React.Component {
    state = {
        results: {},    // { [id]: 'success' || 'error' }
        isFinished: false,
        activeQuestion: 0,
        activeState: null,  //{ [answerId]: 'success' || 'error' }
        quiz: [],
        loading: true
    };

    answerClickHandler = answerId => {
        if (this.state.activeState) {
            const key = Object.keys(this.state.activeState)[0];
            if (this.state.activeState[key] === 'success') return;
        }

        const results = this.state.results;
        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                activeState: { [answerId]: 'success' },
                results
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
            results[question.id] = 'error';
            this.setState({
                activeState: { [answerId]: 'error' },
                results
            });
        }
    };

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            activeState: null
        });
    }

    isQuizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`);

            const quiz = response.data;
            this.setState({
                quiz,
                loading: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    
                    {
                        this.state.loading
                            ? <Loader />
                            : this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRetry={this.retryHandler}
                                  />
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