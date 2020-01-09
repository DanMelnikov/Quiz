import {combineReducers} from 'redux';
import quizReducer from './quiz';
import creatorReducer from './creator';
import authReducer from './auth';

export default combineReducers({
    quiz: quizReducer,
    creator: creatorReducer,
    auth: authReducer
});