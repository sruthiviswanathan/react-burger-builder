import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-82f8b.firebaseio.com/'
});

export default instance;