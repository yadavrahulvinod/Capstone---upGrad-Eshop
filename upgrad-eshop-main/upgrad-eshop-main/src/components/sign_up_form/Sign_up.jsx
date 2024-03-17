import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";

const defaultTheme = createTheme();

export default function Sign_up() {
  

  const [errorMessage, setErrorMessage] = React.useState("");
  const { register, handleSubmit, formState: { errors },watch} = useForm();
  const password = watch("Password");


  // ------------------------------- fetch request for Sign Up starts ---------------------------------
  const send_data = async (formData) => {
    console.log("Form Data Object:", formData);

    try {
      const response = await fetch("http://localhost:3001/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          contactNumber: formData.PhoneNumber,
          email: formData.email,
          password: formData.Password,
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
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
// ---------------------------------- fetch request for Sign Up ends ----------------------------



  return (


    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            my: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

            {/* --------------------------- sign up form starts ----------------------------- */}


          <Box
            component="form"
            onSubmit={handleSubmit(send_data)}
            noValidate
            sx={{ mt: 3 }}
          >
                                             {/* firstname */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 5,
                      message: "First Name must be at least 5 characters long",
                    }
                  })}
                  error={!!errors?.firstName}
                  helperText={errors?.firstName && errors.firstName.message}
                />
              </Grid>
                                     {/* lastname */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 5,
                      message: "Last Name must be at least 5 characters long",
                    },
                  })}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName && errors.lastName.message}
                />
              </Grid>

                                            {/* Phone Number */}
              <Grid item xs={12}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  label="Phone Number"
                  {...register("PhoneNumber", {
                    required: "Phone Number is required",
                    minLength: {
                      value: 10,
                      message: "Phone Number must be at least 10 digits long",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone Number must be exactly 10 digits long",
                    },
                    min: {
                      value: 1000000000,
                      message: "Phone Number must be at least 10 digits long",
                    },
                    max: {
                      value: 9999999999,
                      message: "Phone Number must not exceed 10 digits",
                    },
                  })}
                  error={!!errors?.PhoneNumber}
                  helperText={errors?.PhoneNumber && errors.PhoneNumber.message}
                />
              </Grid>
                              
                                        {/* Email */} 
              <Grid item xs={12}>
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
              </Grid>

                                   {/* password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  {...register("Password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters long",
                    },
                  })}
                  error={!!errors?.Password}
                  helperText={errors?.Password && errors.Password.message}
                />
              </Grid>

                                               {/* Confirm Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  {...register("ConfirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password ||
                      "Confirm password should be same as Password",
                  })}
                  error={!!errors?.ConfirmPassword}
                  helperText={
                    errors?.ConfirmPassword && errors.ConfirmPassword.message
                  }
                />
              </Grid>
            </Grid>

                                            {/* Sign up Button */}
            <Button
            href="/sign_in"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Sign_in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>

          {/* --------------------------- sign up form ends ----------------------------- */}

         
         {/* ---------------------------- Display error messege here ------------------ */}
        <p style={{ fontSize: "14px", color: "red", textAlign: "center" }}>
          {errorMessage}
        </p>
      </Container>
    </ThemeProvider>


  );
}
