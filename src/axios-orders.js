import axios from 'axios';

const firebaseUrl = '';

const instance = axios.create({
  baseURL: firebaseUrl
});

export default instance;
