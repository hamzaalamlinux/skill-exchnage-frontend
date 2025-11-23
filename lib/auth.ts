import api from './api';
export async function login(email: string, password: string) {
const res = await api.post('/login', { email, password });
return res.data;
}
export async function register(data: any) {
const res = await api.post('/register', data);
return res.data;
}
export async function getUser() {
const res = await api.get('/user');
return res.data;
}