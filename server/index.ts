require('dotenv').config();
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import todoRoutes from './routes/ToDoRoute';
import userRoutes from './routes/UserRoute';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);
app.use(express.static('public'));

app.listen(PORT, () => console.log('Server running on port ' + PORT));
