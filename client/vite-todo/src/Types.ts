

export type TodoType = {
  _id: string;
  desc: string;
  done: boolean;
}


export interface ITodo {
  todos: TodoType[]
  count: number;
  currentPage: string;
  totalPages:number;
}