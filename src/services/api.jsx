import axios from 'axios';

const API_BASE_URL = "http://ec2-54-91-215-149.compute-1.amazonaws.com";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
})

api.interceptors.request.use((config) => {
    const userName = "psAdmin";
    const userPassword = "goledger";

    const AUTH_TOKEN = `Basic ${btoa(`${userName}:${userPassword}`)}`;

    config.headers.Authorization = AUTH_TOKEN;
    // console.log(config)
    return config;
});

api.interceptors.response.use((response) => {
    console.log('sucesso', response)

    return response;
}, (error) => {
    console.log('erro ao buscar dados', error.response)

    return Promise.reject(error);
});

export default api;