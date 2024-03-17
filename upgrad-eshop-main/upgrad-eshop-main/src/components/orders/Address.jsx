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
import { useDispatch, useSelector } from "react-redux";
import { setAll_addresses, setSelected_address } from "../../redux/reducer_functions/AddressSlice";
import Old_Addresses from "./Old_Addresses";
import Categories from "../../common/category/Categories";

const defaultTheme = createTheme();

const Address = ({onNext}) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  let get_id = null;


  
  // ------------------------------- fetch request for Sign Up starts ---------------------------------
  const send_data = async (formData) => {
    try {
        const authToken = localStorage.getItem("Auth-Token");

      const response = await fetch("http://localhost:3001/api/v1/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":authToken
        },
        body: JSON.stringify({
          name: formData.name,
          contactNumber: formData.PhoneNumber,
          city:formData.city,
          landmark:formData.landmark,
          street:formData.Street,
          state:formData.State,
          zipCode:formData.Zipcode
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

      const res = await response.json()

      if(response.ok){
        get_id = res._doc._id
       get_address()
      }

    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  // ---------------------------------- fetch request for Sign Up ends ----------------------------


  // --------------------------------- get all addresses - START -------------------------------
  const get_address = async () => { 
    try {
      const authToken = localStorage.getItem("Auth-Token");
      const response = await fetch("http://localhost:3001/api/v1/addresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
      });
      const data = await response.json();
      const filteredAddress = data.filter((add) => add._id === get_id)[0]
      console.log(filteredAddress)
      console.log(filteredAddress._id)
      dispatch(setSelected_address(filteredAddress));
      onNext()
    } catch (error) {
      console.log(error);
    }
  };
   // --------------------------------- get all addresses - ENDS -------------------------------



  return (
    <>
  
   
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Grid container spacing={2}  sx={{mt:3}}>
          <Grid item xs={12} md={6}>
            <Typography component="h1" variant="h5">
              Your Addresses
            </Typography>

            {/* -------------------- Show old addresses - START ------------------------- */}
            <Container sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
            <Old_Addresses />
            </Container>
            {/* -------------------- Show old addresses - START ------------------------- */}
          </Grid>


          {/* --------------------- New Address - START --------------------------- */}
          <Grid item xs={12} md={6}>
            <Typography component="h1" variant="h5" align="center">
              Enter Your Address
            </Typography>
            <form onSubmit={handleSubmit(send_data)}>
              <Grid container spacing={2} sx={{marginTop:"1px"}}>
                <Grid item xs={12}>

                  {/* fullname inputbox */}
                  <TextField
                    autoComplete="Fullname"
                    name="name"
                    required
                    fullWidth
                    label="Fullname"
                    autoFocus
                    {...register("name", {
                      required: "name is required",
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name && errors.name.message}
                  />
                </Grid>


                {/* number inputbox */}
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
                    })}
                    error={!!errors?.PhoneNumber}
                    helperText={errors?.PhoneNumber && errors.PhoneNumber.message}
                  />
                </Grid>


                {/* city inputbox */}
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    label="City"
                    {...register("city", {
                      required: "City is required",
                    })}
                    error={!!errors?.city}
                    helperText={errors?.city && errors.city.message}
                  />
                </Grid>


                {/* landmark inputbox */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    {...register("landmark")}
                  />
                </Grid>


                {/* street inputbox */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    label="Street"
                    {...register("Street", {
                      required: "Street is required",
                    })}
                    error={!!errors?.Street}
                    helperText={errors?.Street && errors.Street.message}
                  />
                </Grid>


                {/* state inputbox */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    required
                    fullWidth
                    label="State"
                    {...register("State", {
                      required: "State is required",
                    })}
                    error={!!errors?.State}
                    helperText={errors?.State && errors.State.message}
                  />
                </Grid>


                {/* zipcode inputbox */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    required
                    fullWidth
                    label="Zipcode"
                    {...register("Zipcode", {
                      required: "Zipcode is required",
                    })}
                    error={!!errors?.Zipcode}
                    helperText={errors?.Zipcode && errors.Zipcode.message}
                  />
                </Grid>

                {/* submit button */}
                <Grid item xs={12}>
                  <Button
                 
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{  mb: 2 }}
                  >
                    Place Order
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
         {/* --------------------- New Address - END --------------------------- */}





        {/* -------------------- Show Error messege - START --------------------- */}
        <p style={{ fontSize: "14px", color: "red", textAlign: "center" }}>
          {errorMessage}
        </p>
        {/* -------------------- Show Error messege - END --------------------- */}
      </Container>
    </ThemeProvider>
    </>
  );
};

export default Address;
