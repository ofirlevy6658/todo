import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddTaskIcon from '@mui/icons-material/AddTask';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { CheckboxList } from '../components/CheckboxList';
import { CircularProgress, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../api/axios';
import { SideToolBar } from '../components/SideToolBar';
import { TodoList } from '../components/TodoList';

export const TodoAppPage = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [taskInputValue, setTaskInputValue] = useState('');
  const [toastData, setToastData] = useState<{
    msg: string;
    severity: AlertColor;
  }>({ severity: 'success', msg: '' });

  // const { data, refetch } = useQuery(['todos', page], () => getTodos(page), {
  //   keepPreviousData: true,
  // });

  const addTodoMutation = useMutation({
    mutationFn: (inputValue: string) => createTodo(inputValue),
    onSuccess: (resp) => {
      refetch();
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: (resp) => {
      if (data?.todos.length === 1 && page > 1) {
        setPage(page - 1);
      }
      refetch();
    },
  });
  const updateTodoMutation = useMutation({
    mutationFn: (data: { id: number; completed: boolean }) => updateTodo(data),
    onSuccess: (resp) => {
      refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskInputValue) return;
    try {
      await addTodoMutation.mutateAsync(taskInputValue);
      setToastData({ msg: 'Task added successfully', severity: 'success' });
      setOpen(true);
      setTaskInputValue('');
    } catch (e) {
      setToastData({
        msg: 'Oops somthing went wrong, please check the connection',
        severity: 'error',
      });
      setOpen(true);
      console.log(e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodoMutation.mutateAsync(id);
      setToastData({ msg: 'Task removed successfully', severity: 'success' });
      setOpen(true);
    } catch (e) {
      setToastData({
        msg: 'Oops somthing went wrong, please check the connection',
        severity: 'error',
      });
      console.log(e);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      updateTodoMutation.mutateAsync({ id, completed });
    } catch (e) {
      console.log(e);
    }
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          // border: '1px solid black',
        }}>
        <SideToolBar />
        <TodoList />
      </Box>
    </>
  );
  return (
    <>
      <Box
        sx={{
          mt: 25,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h3" gutterBottom color={'primary'}>
          To-Do List
        </Typography>
        <Box
          sx={{
            '& > :not(style)': {
              m: 1,
              width: 500,
              height: 500,
            },
          }}>
          <Paper elevation={10}>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                mx: 'auto',
              }}
              onSubmit={handleSubmit}>
              <InputBase value={taskInputValue} sx={{ ml: 1, flex: 1, height: '45px' }} placeholder="Add new task" onChange={(e) => setTaskInputValue(e.currentTarget.value)} />
              <IconButton type="submit" color="primary">
                {addTodoMutation.isLoading ? <CircularProgress size={25} /> : <AddTaskIcon />}
              </IconButton>
            </Paper>
            <Box
              sx={{
                mt: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '430px',
              }}>
              <Box>{data ? <CheckboxList todos={data.todos} onDelete={handleDelete} onToggle={handleToggle} /> : <Box />}</Box>
              <Stack spacing={2}>
                <Pagination
                  count={data?.totalPages || 1}
                  page={page > (data?.totalPages || 1) ? data?.totalPages : page}
                  onChange={(e, v) => setPage(v)}
                  sx={{
                    '& .MuiPagination-ul': {
                      justifyContent: 'center',
                    },
                  }}
                />
              </Stack>
            </Box>
          </Paper>
        </Box>
        <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={toastData.severity} sx={{ width: '100%' }}>
            {toastData.msg}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
