import axios from 'axios';

export default axios.create({
    baseURL: 'https://quiz-75e07.firebaseio.com/'
});