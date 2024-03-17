import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setSelectedCategory } from '../../redux/reducer_functions/ProductSlice';
import { Box, Divider, Tab, Tabs } from '@mui/material';

const Categories = () => {

    const categories = useSelector((state) => state.products.categories);
    const [value, setValue] = useState(0); 
    const dispatch = useDispatch();


      // Select category from category section
    const handleChange = (event, newValue) => {
        setValue(newValue);
        const Index = newValue === 0 ? "" : categories[newValue - 1];
        dispatch(setSelectedCategory(Index)); 
    };

    useEffect(() => {
        fetchData();
    }, []); 



    // Fetch categories from backend 
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/products/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.log("Data not found");
                return;
            }
            const data = await response.json();
            dispatch(setCategories(data));
        } catch (error) {
            console.log(error);
        }
    };

    return (

        
        <div>
            {/* --------------------------- Category tab - START -------------------- */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="All"/>
                    {categories.map((category, index) => (
                        <Tab key={index} label={category} />
                    ))}
                </Tabs>
            </Box>
            <Divider />
             {/* --------------------------- Category tab - ENDS -------------------- */}

        </div>
    );
};

export default Categories;
