import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "../product_info/product_info_css.css";

import { Container, Grid, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Categories from "../../common/category/Categories";
import { useDispatch } from "react-redux";
import { setBuyProduct } from "../../redux/reducer_functions/ProductSlice";



const Product_details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const dispatch = useDispatch()
  const navigate = useNavigate() 


  // get the details of the product
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/products/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error", error.message);
      }
    };

    fetchProductDetails();
  }, [id]);


  // handle change in Quantity of product
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  

  // upfate buy product on redux with quantity
  const handlebuy =()=>{
    dispatch(setBuyProduct({ ...product, quantity }));
    navigate("/order");
  }
  return (
    <>
 

     {/* ------------------------------- Producs Details Page - START ------------------------ */}

      <div style={{margin:"20px"}}>

        {/* ------------------------------- Name of product - START -------------------------- */}
      <Typography variant="h4" align="center" className="product-name" style={{ marginTop: '20px' }}>
          {product?.name}
        </Typography>
        {/* ------------------------------- Name of product - ENDS -------------------------- */}

        <Grid
          sx={{marginTop:"2px"}}
          container
          align="center"
          spacing={4}
          className="product-details-container"
        >

          {/* ------------------------- Image of product - START --------------------------- */}
          <Grid item xs={12} sm={6} md={5}>
            <img
              src={product?.imageURL}
              alt={product?.name}
              className="product-image"
              style={{ height: "450px", width: "500px", boxShadow: '4px 4px 8px grey' }}
            />
          </Grid>
          {/* ------------------------- Image of product - ENDS --------------------------- */}


          {/* ------------------------- description of product - START --------------------------- */}       
          <Grid item xs={12} sm={6} md={6}>
            <Typography
              variant="body1"
              align="center"
              className="product-description"
            >
              {product?.description}
            </Typography>

          {/* ------------------------- escription of product - ENDS --------------------------- */}


          {/* ----------------------- Table to display other details - START -------------------- */}
            <div style={{ marginTop: '20px' }}>
              <TableContainer component={Paper} elevation={3} style={{ boxShadow: '4px 4px 8px grey' }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Category:</strong></TableCell>
                      <TableCell>{product?.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Manufacturer:</strong></TableCell>
                      <TableCell>{product?.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Available Items:</strong></TableCell>
                      <TableCell>{product?.availableItems}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
         {/* ----------------------- Table to display other details - ENDS -------------------- */}


          {/* ------------------------- description of product - START --------------------------- */}       

            <Typography
              sx={{marginTop:"30px"}}
              variant="body1"
              align="center"
              className="product-description"
            >
              <h3>Price : {product?.price} Rs.</h3>
            </Typography>

          {/* ------------------------- escription of product - ENDS --------------------------- */}



         {/* --------------------- Quantity inputbox - START --------------------------- */}
            <div style={{ marginTop: '20px' }}>
              <TextField
                type="number"
                label="Quantity"
                variant="outlined"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                style={{ width: '150px', marginRight: '20px' }}
              />
             
              <Button variant="contained" color="primary" onClick={handlebuy}>
                Place Order
              </Button>
             
            </div>
       {/* --------------------- Quantity inputbox - ENDS --------------------------- */}

          </Grid>
        </Grid>
      </div>

       {/* ------------------------------- Producs Details Page - ENDS ------------------------ */}
    
    </>
  );
};

export default Product_details;
