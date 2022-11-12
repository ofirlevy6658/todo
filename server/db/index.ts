import * as dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default {
  query: (text: string, params: any) => pool.query(text, params),
};
