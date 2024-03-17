import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setProducts,
} from "../../redux/reducer_functions/ProductSlice";
import Product_card from "./Product_card";
import Drawer_filter from "./Drawer_filter";
import { Divider, Grid } from "@mui/material";
import Categories from "../../common/category/Categories";
import { Outlet } from "react-router-dom";

const Products_Page = () => {
  return (
    <>
      {/*  -------------------- This is skeleton to display product page - START ------------------ */}
      {/* show category tab */}
      <Categories />

      <Grid container spacing={2}>
        <Grid xs={2}>
          {/* to display product filer  */}
          <Drawer_filter />
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid>
          {/* display product cards  */}
          <Product_card />
        </Grid>
      </Grid>
      {/*  -------------------- This is skeleton to display product page - ENDS ------------------ */}

    
    </>
  );
};

export default Products_Page;
