import cors from 'cors';

import express from 'express';
import todoRoutes from './routes/ToDoRoute';
import userRoutes from './routes/UserRoute';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => console.log('Server running on port ' + PORT));
