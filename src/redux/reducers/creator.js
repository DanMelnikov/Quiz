import { 
    CREATE_QUIZ_QUESTION, 
    QUIZ_POST_START, 
    QUIZ_POST_SUCCESS, 
    QUIZ_POST_ERROR } from "../actions/actionTypes";

const initialState = {
    quiz: [],
    posting: false,
    error: null
};

export default function creatorReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state, quiz: [...state.quiz, action.item]
            }
        case QUIZ_POST_START:
            return {
                ...state, posting: true
            }
        case QUIZ_POST_SUCCESS:
            return {
                ...state, posting: false, quiz: []
            }
        case QUIZ_POST_ERROR:
            return {
                ...state, posting: false, error: action.error
            }
        default:
            return state;
    }        
}