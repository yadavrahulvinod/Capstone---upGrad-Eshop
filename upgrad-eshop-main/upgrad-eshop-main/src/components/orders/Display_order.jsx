import React from "react";
import { useSelector } from "react-redux";
import Categories from "../../common/category/Categories";
import { Button, Grid, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, IconButton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import the CheckCircleIcon

const Display_order = ({ onNext }) => {
  const product = useSelector((state) => state.products.buy_product);

  const handleBuy = () => {
    onNext();
  };

  return (
    <>
      
      <Container>
        <Grid container justifyContent="center" spacing={4} sx={{ marginTop: "2px", marginBottom: "50px" }}>
          {/* -------------------------- Product image - START ------------------------------ */}
          <Grid item xs={12} sm={6}>
            <img
              src={product?.imageURL}
              alt={product?.name}
              style={{ height: "300px", width: "400px", boxShadow: '4px 4px 8px grey' }}
            />
          </Grid>
          {/* -------------------------- Product image - ENDS ------------------------------ */}

          {/* -------------------------- Product price table - START ----------------------- */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" align="center" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {product?.description}
            </Typography>
            <TableContainer component={Paper} elevation={3} sx={{ boxShadow: '4px 4px 8px grey', marginBottom: '20px' }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Price of item :</strong></TableCell>
                    <TableCell>{product?.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Quantity :</strong></TableCell>
                    <TableCell>{product?.quantity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total :</strong></TableCell>
                    <TableCell>{product?.price * product?.quantity}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* -------------------------- Place Order button - START ----------------------- */}
            <Button variant="contained" color="primary" onClick={handleBuy} fullWidth>
              Place Order
            </Button>
            {/* -------------------------- Place Order button - END ----------------------- */}



          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Display_order;
