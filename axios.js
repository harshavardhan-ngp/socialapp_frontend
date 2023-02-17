import axios from "axios";

const token = localStorage.getItem("auth");
console.log('token:', token);

export const api = axios.create({
  baseURL: "http://localhost:3333/",
});

api.defaults.headers.common['Authorization']=token