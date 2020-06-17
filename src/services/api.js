import axios from 'axios';

const api = axios.create({ baseURL: 'http://serasa.test/api' });

export default api;