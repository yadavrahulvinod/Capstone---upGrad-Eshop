import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Success = () => {
    

    const [success, setsuccess] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const product = useSelector((state) => state.products.buy_product);
    const addressData = useSelector((state) => state.address.selected_address);

    const order = async () => {
        try {
          const authToken = localStorage.getItem("Auth-Token");
    
          const response = await fetch("http://localhost:3001/api/v1/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": authToken,
            },
            body: JSON.stringify({
              product: product._id,
              address: addressData._id,
              quantity: product.quantity,
            }),
          });
    
          if (!response.ok) {
            const errorMessage = await response.text();
            setErrorMessage(errorMessage);
            return;
          }
    
          if (response.ok) {
            setsuccess(true);
          }
        } catch (error) {
          console.log(error);
          setErrorMessage("An error occurred. Please try again later.");
        }
      };
  

     useEffect(()=>{
        order()
     },[])

  return (
    <Grid item xs={4} sm={4} sx={{ textAlign: "center" }}>
        {
            success && (
                <h1>Order placed successfully!</h1>
            )
        }
          <Link to="/">
            <Button className='my-5' variant="contained" color="primary" sx={{ mt: 4 }}>
              Go back
            </Button>
          </Link>

          <p
          style={{
            fontSize: "14px",
            color: "red",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          {errorMessage}
        </p>

    </Grid>
  )
}

export default Success
