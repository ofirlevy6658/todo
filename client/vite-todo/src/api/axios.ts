import axios from 'axios';

import { router } from './../App';
import { ILists } from './../Types';
import { ITodo } from '../Types';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken') ?? localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken') ?? '');
        try {
          const res = await axiosInstance.post<{ accessToken: string }>('user/refresh', { refreshToken });
          updateTokens(res.data.accessToken);
          return;
        } catch (e) {
          clearStorage();
          router.navigate('/login', { replace: true });
        }
      }
    }
    return Promise.reject(error);
  }
);

const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
const updateTokens = (accessToken: string) => {
  if (sessionStorage.getItem('accessToken')) {
    sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
  } else if (localStorage.getItem('accessToken')) {
    localStorage.setItem('accessToken', JSON.stringify(accessToken));
  }
};

export const getList = async ({ pageParam = 1 }) => {
  const res = await axiosInstance.get<ILists>('/list', {
    params: { page: pageParam, limit: 20 },
  });
  return res.data;
};

export const addList = async (name: string) => {
  const res = await axiosInstance.post<ILists>('/list', { name });
  return res.data;
};

export const updateBackground = async (data: { id: string; bgIndex: number }) => {
  const { id, bgIndex } = data;
  const res = await axiosInstance.put(`/list/${id}/background`, { background: bgIndex });
  return res.data;
};

export const getTodos = async ({ pageParam = 1, id = '' }) => {
  const res = await axiosInstance.get<ITodo>(`/todo/list/${id}`, {
    params: { page: pageParam, limit: 20 },
  });
  return res.data;
};

export const createTodo = async (content: string) => {
  const res = await axiosInstance.post('/todo/add', { content });
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await axiosInstance.delete(`/todo/${id}`);
  return res.data;
};

export const updateTodo = async (data: { id: number; completed: boolean }) => {
  const res = await axiosInstance.put(`/todo/list/${data.id}`, { completed: data.completed });
  return res.data;
};

export const loginReq = async (credinatils: { email: string; password: string }) => {
  const res = await axiosInstance.post<{ accessToken: string; refreshToken: string }>('user/login', credinatils);
  return res.data;
};

export const registerReq = async (credinatils: { fullName: string; email: string; password: string }) => {
  const res = await axiosInstance.post('user/register', credinatils);
  return res.data;
};
