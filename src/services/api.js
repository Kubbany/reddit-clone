import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token)
    {
        config.headers.Authorization = token;
    }
    return config;
});

export const login = async (credentials) => {
    const { data } = await API.post("auth/login", credentials);
    return data;
}

export const register = async (credentials) => {
    const { data } = await API.post("auth/register", credentials);
    return data;
}

export default API;