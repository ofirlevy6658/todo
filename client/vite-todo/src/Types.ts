export type TodoType = {
  id: number;
  user_id: number;
  content: string;
  completed: boolean;
};

export interface ITodo {
  todos: TodoType[];
  count: number;
  currentPage: string;
  totalPages: number;
  list: {
    name: string;
    background: BackgroundType;
  };
}

export interface ILists {
  rows: {
    name: number;
    id: number;
    icon: string;
  }[];
  count: number;
}

export type BackgroundType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
