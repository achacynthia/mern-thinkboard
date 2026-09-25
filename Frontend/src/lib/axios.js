import axios from 'axios'
const BASE_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

// Create an Axios instance with the base URL depending on the environment
const api = axios.create({
  baseURL: BASE_URL,
})

export default api