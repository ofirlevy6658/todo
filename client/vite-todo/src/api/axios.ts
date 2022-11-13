import axios, { AxiosRequestConfig } from "axios";
import { ITodo } from "../Types";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
});
instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

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
  const res = await instance.get<ITodo>("", {
    params: { page, limit: 7 },
  });
  return res.data;
};

export const createTodo = async (taskInputValue: string) => {
  const res = await instance.post("/save", { desc: taskInputValue });
  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await instance.delete("/delete", {
    data: { _id: id },
  });
  return res.data;
};

export const updateTodo = async (data: { _id: string; done: boolean }) => {
  const res = await instance.put("http://localhost:5000/update", data);
  return res.data;
};
