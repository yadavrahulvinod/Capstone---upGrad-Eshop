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
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function Add_product() {
  
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = React.useState("");
  const { register, handleSubmit, formState: { errors },watch} = useForm();


  // you have not provided admin log in and password so how can we test functionality is it working or not
  // still i had design thses by undertsanding backend code 

  // ------------------------------- fetch request for Sign Up starts ---------------------------------
  const send_data = async (formData) => {
    const authToken = localStorage.getItem("Auth-Token");
    console.log(formData)
    try {
      const response = await fetch("http://localhost:3001/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
            name: formData.name,
            category: formData.Category,
            price: formData.Price,
            description: formData.Description,
            manufacturer: formData.Manufacturer,
            availableItems:formData.Available_items,
            imageURL:formData.imageUrl
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

      if(response.ok){
            navigate("/")
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
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>

            {/* --------------------------- sign up form starts ----------------------------- */}


          <Box
            component="form"
            onSubmit={handleSubmit(send_data)}
            noValidate
            sx={{ mt: 3 }}
          >
                                             {/* name */}
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  {...register("name", {
                    required: "name is required",
                  })}
                  error={!!errors?.name}
                  helperText={errors?.name && errors.name.message}
                />
              </Grid>
                                     {/* category */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Category"
                  {...register("Category", {
                    required: "Category is required",
                  })}
                  error={!!errors?.Category}
                  helperText={errors?.Category && errors.Category.message}
                />
              </Grid>

                                            {/* Price */}
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  label="Price"
                  {...register("Price", {
                    required: "Price is required",
                  })}
                  error={!!errors?.Price}
                  helperText={errors?.Price && errors.Price.message}
                />
              </Grid>


                                              {/* Available items */}
                <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  fullWidth
                  label="Available items"
                  {...register("Available_items", {
                    required: "Available_items is required",
                  })}
                  error={!!errors?.Available_items}
                  helperText={errors?.Available_items && errors.Available_items.message}
                />
              </Grid>

                              
                                        {/* desManufacturer */} 
              <Grid item xs={12}>
                <TextField
                  type="text"
                  required
                  fullWidth
                  label="Description"
                  {...register("Description", {
                    required: "Description is required",
                  })}
                  error={!!errors?.Description}
                  helperText={errors?.Description && errors.Description.message}
                />
              </Grid>

                                   {/* Manufacturer */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Manufacturer"
                  {...register("Manufacturer", {
                    required: "Manufacturer is required",
                  })}
                  error={!!errors?.Manufacturer}
                  helperText={errors?.Manufacturer && errors.Manufacturer.message}
                />
              </Grid>

                                               {/* Confirm Password */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Image-URL"
                  {...register("imageUrl", {
                    required: "imageUrl is required",
                  })}
                  error={!!errors?.imageUrl}
                  helperText={
                    errors?.imageUrl && errors.imageUrl.message
                  }
                />
              </Grid>
            </Grid>

                                            {/* Sign up Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
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
