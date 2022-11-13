import axios, { AxiosRequestConfig } from 'axios';
import { ITodo } from '../Types';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});
const accessToken = sessionStorage.getItem('accessToken');

if (accessToken) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(accessToken)}`;
}

// instance.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     return response;
//   },
//   function (error) {
//     console.log(error);

//     return Promise.reject(error);
//   }
// );

export const getTodos = async (page = 1) => {
  const res = await instance.get<ITodo>('/todo', {
    params: { page, limit: 7 },
  });
  return res.data;
};

export const createTodo = async (content: string) => {
  const res = await instance.post('/todo/add', { content });
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await instance.delete(`/todo/${id}`);
  return res.data;
};

export const updateTodo = async (data: { id: number; completed: boolean }) => {
  const res = await instance.put(`todo/${data.id}`, { completed: data.completed });
  return res.data;
};

export const loginReq = async (credinatils: { email: string; password: string }) => {
  const res = await instance.post('user/login', credinatils);
  return res.data;
};

export const registerReq = async (credinatils: { fullName: string; email: string; password: string }) => {
  const res = await instance.post('user/register', credinatils);
  return res.data;
};
