import { ILists } from './../Types';
import { router } from './../App';
import axios from 'axios';
import { ITodo } from '../Types';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

const accessToken = sessionStorage.getItem('accessToken') ?? localStorage.getItem('accessToken');

if (accessToken) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(accessToken)}`;
}

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        sessionStorage.clear();
        router.navigate('/login', { replace: true });
      }
    }
    return Promise.reject(error);
  }
);

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

export const getTodos = async ({ pageParam = 1 }) => {
  const res = await axiosInstance.get<ITodo>('/todo', {
    params: { page: pageParam, limit: 7 },
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
  const res = await axiosInstance.put(`todo/${data.id}`, { completed: data.completed });
  return res.data;
};

export const loginReq = async (credinatils: { email: string; password: string }) => {
  const res = await axiosInstance.post('user/login', credinatils);
  return res.data;
};

export const registerReq = async (credinatils: { fullName: string; email: string; password: string }) => {
  const res = await axiosInstance.post('user/register', credinatils);
  return res.data;
};
