// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '', // Vazio - o proxy vai redirecionar automaticamente
});

console.log('✅ API configurada para usar proxy');

export default api;
