import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yhs-back-end.herokuapp.com',
  timeout: 20000,
});

export default api;
