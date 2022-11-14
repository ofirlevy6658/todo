export default interface User {
  id: number;
  password?: string;
  email: string;
  created_at: Date;
  last_login: Date;
  full_name?: string;
}
