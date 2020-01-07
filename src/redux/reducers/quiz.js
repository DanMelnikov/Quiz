import { 
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR, 
    FETCH_QUIZ_BY_ID_SUCCESS, 
    FETCH_QUIZ_BY_ID_ERROR,
    QUIZ_SET_ANSWER_STATE,
    QUIZ_FINISH,
    QUIZ_NEXT_QUESTION, 
    QUIZ_RETRY } from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,

    results: {},    // { [id]: 'success' || 'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null,  //{ [answerId]: 'success' || 'error' }
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_BY_ID_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case FETCH_QUIZ_BY_ID_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case QUIZ_SET_ANSWER_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case QUIZ_FINISH:
            return {
                ...state, isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: null
            }
        case QUIZ_RETRY:
            return {
                ...state, results: {}, answerState: null, isFinished: false, activeQuestion: 0
            }
        default:
            return state;
    }
}