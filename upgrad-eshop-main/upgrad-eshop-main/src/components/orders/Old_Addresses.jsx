import {
  Typography,
  Box,
  Container,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAll_addresses,
  setSelected_address,
} from "../../redux/reducer_functions/AddressSlice";
import { useNavigate } from "react-router-dom";

const Old_Addresses = ({ onNext }) => { 
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address.all_address);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigate = useNavigate();

  // ---------------------------------- fetch addresses from backend - START ------------------------
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
      dispatch(setAll_addresses(data));
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------------------------- fetch addresses from backend - ENDS ------------------------

  useEffect(() => {
    get_address();
  }, []);


  // -------------------------- select address checkbox - START ---------------------------------
  const handleAddressCheckboxChange = (id) => {
    if (selectedAddressId !== id) {
      setSelectedAddressId(id);
    } else {
      setSelectedAddressId(null);
    }
  };
  // -------------------------- select address checkbox - ENDS ---------------------------------


  // -------------------------- button to rpoceed with old address - START ------------------
  const handlePlaceOrder = () => {
    console.log(selectedAddressId);
  const selectedAddress = addresses.find(
    (address) => address._id === selectedAddressId
  );
  dispatch(setSelected_address(selectedAddress));
  if (typeof onNext === 'function') {
    onNext(); 
  }
  navigate("/confirmed");
  };
// -------------------------- button to rpoceed with old address - ENDS ------------------





  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      <FormGroup>


 
        {/* ------------------- Map checknox with addresses - START ----------------------- */}
        {addresses.map((add) => (
          <Box
            key={add._id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              marginBottom: "10px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedAddressId === add._id}
                  onChange={() => handleAddressCheckboxChange(add._id)}
                  value={add._id}
                />
              }
              label={
                <>
                  <Typography variant="body1" align="center" paragraph>
                    {add?.name}, {add?.city}
                  </Typography>
                  <Typography variant="body1" align="center" paragraph>
                    {add?.state}, {add?.street}, {add?.zipCode}
                  </Typography>
                </>
              }
            />
          </Box>
        ))}
           {/* ------------------- Map checknox with addresses - START ----------------------- */}



         {/* ---------------------- button to submit old data - START ------------------------ */}
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Use this address
        </Button>
        {/* ---------------------- button to submit old data - ENDS ------------------------ */}
      </FormGroup> 
    </Container>
  );
};

export default Old_Addresses;
