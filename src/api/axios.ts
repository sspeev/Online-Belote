import * as axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';//sensitive
const API_VERSION = 'v0.1.0';

const instance = axios.default.create({
    baseURL: `${BASE_URL}/api/`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Version': API_VERSION
    }
})

export { instance as axios };