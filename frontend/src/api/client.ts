import axios from 'axios';

export const questionClient = axios.create({
  baseURL: "http://localhost:8080/questions", // process.env.REACT_APP_BACKEND_URL
});