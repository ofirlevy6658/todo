import axios, { AxiosRequestConfig } from "axios"
import { ITodo } from "../Types";

// const baseUrl = axios.create({
//     baseURL: 'http://localhost:5000/'
// })

export interface AxiosResponse<T = any>  {
    data: ITodo;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
  }


export const getTodos = async (page = 1) => {
    const res:AxiosResponse = await axios.get("http://localhost:5000/", {
        params: { page, limit: 7 },
      });
      return res
}
