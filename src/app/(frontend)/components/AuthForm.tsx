'use client';

import axios from 'axios';
import { useState } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { AuthMode, SignInSocial } from 'types';
import Input from './Input';

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>(AuthMode.Login);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const toggleFormMode = () => {
    if (mode === AuthMode.Login) {
      setMode(AuthMode.Register);
    } else {
      setMode(AuthMode.Login);
    }
  };

  const onSumit = async (data: FieldValues) => {
    setIsLoading(true);
    if (mode === AuthMode.Login) {
      // call login api
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (res?.error) {
        alert(res.error);
      }

      if (res?.ok && !res?.error) {
        alert('Sign in successfully');
      }
    } else {
      // call register api
      try {
        await axios.post('/api/register', data);
        reset();
        setMode(AuthMode.Login);
      } catch (error) {
        console.error(error);
        alert('Register error');
      }
    }
    setIsLoading(false);
  };

  const siginWithSocial = async (type: SignInSocial) => {
    setIsLoading(true);
    const res = await signIn(type, { redirect: false });
    if (res?.error) {
      alert(res.error);
    }

    if (res?.ok && !res?.error) {
      alert('Sign in successfully');
    }

    setIsLoading(false);
  };

  return (
    <Box component='form' mt={3} onSubmit={handleSubmit(onSumit)}>
      {mode === AuthMode.Register && (
        <Input
          id='name'
          required
          errors={errors}
          register={register}
          label='Name'
          placholder='Please enter your name'
          type='text'
          InputIcon={AccountCircleIcon}
        />
      )}
      <Input
        id='email'
        required
        errors={errors}
        register={register}
        options={{
          validate: {
            emailPattern: (value) => {
              const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
              return emailRegex.test(value) || 'Invalid email address';
            },
          },
        }}
        label='Email'
        placholder='example@email.com'
        type='email'
        InputIcon={EmailIcon}
      />
      <Input
        id='password'
        required
        errors={errors}
        register={register}
        options={{
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
        label='Password'
        placholder=''
        type='password'
        InputIcon={LockIcon}
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3 }}
        disabled={!isValid || isLoading}>
        {mode === AuthMode.Login ? 'Sign in' : 'Register'}
      </Button>
      <Box
        display='flex'
        alignItems='center'
        width='100%'
        color={(theme) => theme.palette.grey[700]}
        mt={6}
        sx={{
          '&:before, &:after': {
            content: '""',
            display: 'block',
            height: 2,
            flex: 1,
            backgroundColor: (theme) => theme.palette.grey[300],
          },
        }}>
        <Box component='span' px={1}>
          Or continue with
        </Box>
      </Box>
      <Box display='flex' gap={4} mt={4}>
        <Button
          variant='outlined'
          color='info'
          fullWidth
          onClick={() => siginWithSocial(SignInSocial.Github)}>
          <GitHubIcon />
        </Button>
        <Button
          variant='outlined'
          color='info'
          fullWidth
          onClick={() => siginWithSocial(SignInSocial.Google)}>
          <GoogleIcon />
        </Button>
      </Box>
      <Box mt={6}>
        <Typography color={(theme) => theme.palette.grey[700]}>
          {mode === AuthMode.Login
            ? 'New to messenger?'
            : 'Already has a account?'}
          <Link
            onClick={toggleFormMode}
            pl={1}
            color='inherit'
            sx={{ cursor: 'pointer' }}>
            {mode === AuthMode.Login ? 'Create an account' : 'Login'}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
