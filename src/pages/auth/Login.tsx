import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate  } from 'react-router-dom';
import * as Yup from 'yup';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';

const theme = createTheme();

export default function SignIn() {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({
    name,
    control,
  });

    const history = useNavigate ();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { handleSubmit, formState, control } = useForm(formOptions);
    const { errors } = formState;

    /*const onSubmitChange = (data: any) => {
        console.log(data)
        const {email, password} = data
        if (error !== '') setError('')
        auth.signInWithEmailAndPassword(email, password)
        .then((result: any) => {
            logging.info(result)
            history('/')
        })
        .catch((error: any) => {
            logging.error(error.message);
            setError(error.message)
        })

    }*/

    const onSubmit = (data:any) => console.log(data);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box  sx={{ mt: 1 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />}
                            />
            <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />}
                    />
            
           <Controller 
                name="button"
                control={control}
                render={({field}) =>  <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>}
           />
        </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}