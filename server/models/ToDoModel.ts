import mongoose from 'mongoose';

export interface ITodo {
  desc: string,
  done: boolean
}

export const todoSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const todo = mongoose.model<ITodo>('ToDo', todoSchema);
export default todo;
