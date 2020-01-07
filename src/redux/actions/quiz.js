import axios from '../../axios/axios-quiz';
import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR, 
    FETCH_QUIZ_BY_ID_SUCCESS, 
    FETCH_QUIZ_BY_ID_ERROR,
    QUIZ_SET_ANSWER_STATE,
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION, 
    QUIZ_RETRY } from './actionTypes';

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('quizes.json');
            const quizes = [];
            
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                });
            });
            dispatch(fetchQuizesSuccess(quizes));
        } catch (error) {
            fetchQuizesError(error);
        }
    }
}

export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get(`quizes/${id}.json`);
    
            const quiz = response.data;
            dispatch(fetchQuizByIdSuccess(quiz));
        } catch (error) {
            dispatch(fetchQuizByIdError(error));
        }
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const results = {...state.results};
        const question = state.quiz[state.activeQuestion];

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(quizSetAnswerState({ [answerId]: 'success' }, results));            

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(quizFinish());
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1));
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetAnswerState({ [answerId]: 'error' }, results));
        }
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}

export function fetchQuizByIdSuccess(quiz) {
    return {
        type: FETCH_QUIZ_BY_ID_SUCCESS,
        quiz
    }
}

export function fetchQuizByIdError(error) {
    return {
        type: FETCH_QUIZ_BY_ID_ERROR,
        error
    }
}

export function quizSetAnswerState(answerState, results) {
    return {
        type: QUIZ_SET_ANSWER_STATE,
        answerState,
        results
    }
}

export function quizFinish() {
    return {
        type: QUIZ_FINISH
    }
}

export function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}