export interface Todo {
  id: number;
  user_id: number;
  list_id: number;
  content: string;
  color?: string;
  completed: boolean;
  is_important: boolean;
}
