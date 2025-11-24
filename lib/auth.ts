import api from './api';

export async function login(email: string, password: string) {
  const res = await api.post('/login', { email, password });

  // SAVE TOKEN
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", res.data.token);
  }

  return res.data;
}

export async function register(data: { name: string; email: string; password: string }) {
  const res = await api.post('/register', data);

  // SAVE TOKEN
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", res.data.token);
  }

  return res.data;
}

export async function getUser() {
  const res = await api.get('/user');
  return res.data;
}
