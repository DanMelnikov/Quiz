import {combineReducers} from 'redux';
import quizReducer from './quiz';
import creatorReducer from './creator';

export default combineReducers({
    quiz: quizReducer,
    creator: creatorReducer
});