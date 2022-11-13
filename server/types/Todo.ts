export interface Todo {
  id: number;
  user_id: number;
  content: string;
  color?: string;
  wallpaper?: string;
  completed: boolean;
}
