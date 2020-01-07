import { 
    CREATE_QUIZ_QUESTION, 
    QUIZ_POST_START, 
    QUIZ_POST_SUCCESS, 
    QUIZ_POST_ERROR } from "./actionTypes";
import axios from '../../axios/axios-quiz';

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function createQuizFinish() {
    return async (dispatch, getState) => {
        dispatch(quizPostStart());

        try {
            await axios.post('quizes.json', getState().creator.quiz);

            dispatch(quizPostSuccess());
        } catch (error) {
            dispatch(quizPorstError(error));
        }
    }
}

export function quizPostStart() {
    return {
        type: QUIZ_POST_START
    }
}

export function quizPostSuccess() {
    return {
        type: QUIZ_POST_SUCCESS
    }
}

export function quizPorstError(error) {
    return {
        type: QUIZ_POST_ERROR,
        error
    }
}