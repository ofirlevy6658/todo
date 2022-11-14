import React from 'react';
import { Box, InputLabel, Paper, Typography, FormControl, Button, Checkbox, FormControlLabel, Divider, FormHelperText } from '@mui/material';
import { pink, grey } from '@mui/material/colors';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance, loginReq } from '../api/axios';
import { BootstrapInput } from '../ui/BootstrapInput';
import { Navigate, useNavigate } from 'react-router-dom';
import useSessionStorage from '../hooks/useSessionStorage';
import { useLocalStorage } from 'usehooks-ts';

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(12),
    rememberMe: yup.boolean(),
  })
  .required();

export const LoginPage = () => {
  const [accessTokenSessionStorage, setAccessTokenSessionStorage] = useSessionStorage('accessToken', '');
  const [accessTokenLocalStorage, setAccessTokenLocalStorage] = useLocalStorage('accessToken', '');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const loginMutate = useMutation({
    mutationFn: (credinatils: { email: string; password: string }) => loginReq(credinatils),
    onSuccess: (resp: { accessToken: string }) => {
      watch('rememberMe') ? setAccessTokenLocalStorage(resp.accessToken) : setAccessTokenSessionStorage(resp.accessToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${resp.accessToken}`;
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (credinatils) => {
    console.log(credinatils);
    loginMutate.mutate(credinatils);
  };
  const handleNavigate = () => {
    navigate('/register');
  };
  console.log(accessTokenLocalStorage);

  if (accessTokenSessionStorage || accessTokenLocalStorage) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        '& > :not(style)': {
          m: 1,
          width: 350,
          height: 500,
        },
      }}>
      <Paper elevation={24}>
        <Box sx={{ p: '35px' }}>
          <Typography variant="h6" color={grey[600]}>
            Login
          </Typography>
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{ mt: '25px' }}>
            <FormControl variant="standard" sx={{ mt: '10px' }}>
              <InputLabel shrink htmlFor="email-input">
                Email
              </InputLabel>
              <BootstrapInput id="email-input" placeholder="Jon_voight@gmail.com" {...register('email')} />
              <FormHelperText error id="email-input" sx={{ height: '20px' }}>
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
            {/*  */}
            <FormControl variant="standard" sx={{ mt: '10px' }}>
              <InputLabel shrink htmlFor="password-input">
                Password
              </InputLabel>
              <BootstrapInput id="password-input" type="password" placeholder="*******" {...register('password')} />
              <FormHelperText error id="password-input" sx={{ height: '20px' }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                      color: pink[600],
                    },
                  }}
                  {...register('rememberMe')}
                />
              }
              label="Remember me?"
            />
            <Button
              sx={{
                mt: 4,
                width: 270,
                backgroundColor: pink[400],
                '&:hover': {
                  backgroundColor: pink[600],
                },
              }}
              variant="contained"
              type="submit">
              Login
            </Button>
          </Box>
          <Box sx={{ mt: '35px' }}>
            <Divider variant="middle" />
            <Divider variant="middle" />
            <Typography sx={{ mt: '15px', textAlign: 'center' }}>
              Don't have an Account?
              <Box component="span" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleNavigate}>
                {' '}
                Sign up
              </Box>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
