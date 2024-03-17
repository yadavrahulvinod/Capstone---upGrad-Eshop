import { Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPricefilterProduct, setTimeFilterProduct } from "../../redux/reducer_functions/ProductSlice";

const Drawer_filter = () => {
  const dispatch = useDispatch()
  const [selectedPriceOption, setSelectedPriceOption] = useState(null);
  const [selectAvailability,setSelectedAvailability] = useState(null);

  // ------------------------------------ handle checkbox select - START ----------------------------
  // for price checkbox 
  const handlePriceCheckboxChange = (e,option) => {
    e.preventDefault()
    setSelectedPriceOption(option);
    if(option=="LowToHigh"){
        dispatch(setPricefilterProduct("LowToHigh"))
    }
    if(option=="HighToLow"){
      dispatch(setPricefilterProduct("HighToLow"))
    }
    if(option==="Default"){
      dispatch(setPricefilterProduct("Default"))
    }
    if(option=="Newest"){
      dispatch(setPricefilterProduct("Newest"))
    }
  };

   // ------------------------------------ handle checkbox select - ENDS ----------------------------

  return (
    <>

    {/* ---------------------------- Drawer body - START ----------------------------- */}
    <Container style={{ marginTop: '20px' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >


        {/* ---------------------- filter product option - START -------------------------- */}
        <Grid sx={{marginBottom:"20px"}}>
          <h3>Filter Products</h3>
          <Divider sx={{marginTop:"8px"}}/>
        </Grid>

        {/* ---------------------- filter price options - START ----------------------------- */}
        <Grid sx={{marginTop:"20px"}}>
          <FormGroup>

          {/* for Deafult oder of products */}
          <FormControlLabel
              control={
                <Checkbox
                  checked={selectedPriceOption === "Default"}
                  onChange={(e) => handlePriceCheckboxChange(e,"Default")}
                />
              }
              label="Default"
            />

            {/* for Low to HIGH order */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedPriceOption === "LowToHigh"}
                  onChange={(e) => handlePriceCheckboxChange(e,"LowToHigh")}
                />
              }
              label="Low to High"
            />

            {/* for high to low order */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedPriceOption === "HighToLow"}
                  onChange={(e) => handlePriceCheckboxChange(e,"HighToLow")}
                />
              }
              label="High to Low"
            />

<FormControlLabel
              control={
                <Checkbox
                  checked={selectedPriceOption === "Newest"}
                  onChange={(e) => handlePriceCheckboxChange(e,"Newest")}
                />
              }
              label="New Arrivals"
            />


          </FormGroup>


          
        </Grid>
        {/* ---------------------- filter price options - ENDS ----------------------------- */}

      </Grid>
    </Container>
      {/* ---------------------------- Drawer body - ENDS ----------------------------- */}
    </>
  );
};

export default Drawer_filter;
