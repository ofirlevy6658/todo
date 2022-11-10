import axios, { AxiosRequestConfig } from "axios";
import { ITodo } from "../Types";

const baseUrl = axios.create({
  baseURL: "http://localhost:5000/",
});

export interface AxiosResponse<T = any> {
  data: ITodo;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export const getTodos = async (page = 1) => {
  const res = await baseUrl.get<ITodo>("", {
    params: { page, limit: 7 },
  });
  return res;
};

export const createTodo = async (taskInputValue: string) => {
  const res = await baseUrl.post("/save", { desc: taskInputValue });
  return res;
};

export const deleteTodo = async (id: string) => {
  const res = await baseUrl.delete("/delete", {
    data: { _id: id },
  });
  return res;
};

export const updateTodo = async (data: { _id: string; done: boolean }) => {
  const res = await baseUrl.put("http://localhost:5000/update", data);
  return res;
};
