import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setisAdmin, setisAuthenticated } from '../../redux/reducer_functions/AuthSlice';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();



  
  const send_data = async (formData) => {
   
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setErrorMessage(errorMessage);
        setTimeout(() => {
          setErrorMessage("");
        }, 4000);
        return;
      }

      const responsedata = await response.json();

      // check is user authenticatied is true from response send by backend
      if (responsedata.isAuthenticated) {
        // get and save AUTH token from resonse header to localstorage
        const token = response.headers.get("X-Auth-Token");
        localStorage.setItem('Auth-Token', token);

        // check if AUTH-TOKEN endswith this values then  user is admin
         if (token.endsWith("1@3456Qw-")) {
          dispatch(setisAdmin(true));
        }
        dispatch(setisAuthenticated(true));
        navigate('/');

      } else {
        console.log("User is not authenticated");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  return (
    <>
    {/* ------------------------------- Login form - START ------------------------------------ */}

    <ThemeProvider theme={defaultTheme}>
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
          {/* Lock image on tap of form */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>


          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {/* --------------------------- Input Feilds - START --------------------------- */}

          <Box component="form" onSubmit={handleSubmit(send_data)} noValidate sx={{ mt: 1 }}>

            {/* Email inputbox */}
            <TextField
              type="email"
              required
              fullWidth
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email && errors.email.message}
            />


            {/* passowrd inputbox */}
            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              autoComplete="current-password"
              {...register("password", {
                required: "password is required",
              })}
              error={!!errors?.password}
              helperText={errors?.password && errors.password.message}
            />


            {/* Sign In button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>


            {/* link to sign up if user is new to website */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/Sign_up" variant="body2" style={{ color: 'black' }}>
                  <Typography variant="body2" style={{ display: 'inline', color: 'black' }}>{"Don't have an account? "}</Typography>
                  <Typography variant="body2" style={{ display: 'inline', color: 'blue' }}>Sign Up</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>

           {/* --------------------------- Input Feilds - ENDS --------------------------- */}

        </Box>


        {/* ---------------------- Dispaly Error messege - START ------------------------ */}
        <p style={{ fontSize: "14px", color: "red", textAlign: "center" }}>
          {errorMessage}
        </p>
         {/* ---------------------- Dispaly Error messege - ENDS ------------------------ */}
      </Container>
    </ThemeProvider>
    </>
  );
}
