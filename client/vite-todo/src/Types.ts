export type TodoType = {
  id: number;
  user_id: number;
  content: string;
  color?: string;
  wallpaper?: string;
  completed: boolean;
};

export interface ITodo {
  todos: TodoType[];
  count: number;
  currentPage: string;
  totalPages: number;
}
