import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-builder-react-2f767.firebaseio.com/'
});

export default instance;