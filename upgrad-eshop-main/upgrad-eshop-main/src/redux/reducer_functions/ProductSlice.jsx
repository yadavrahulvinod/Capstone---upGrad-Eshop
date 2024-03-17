import { createSlice } from "@reduxjs/toolkit";

// Initial state of all states
const initialState = {
    products: [],
    categories: [],
    selectedCategory: "All",
    filterProduct: [],
    buy_product: null,
    modification_product : null,
};

// Store old default data
let oldProductData = [];

// Main function
const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Update products
        setProducts: (state, action) => {
            state.products = action.payload;
            oldProductData = action.payload;
        },
         
        setModificationProduct : (state,action) => {
           state.modification_product = action.payload
        },

        // Update buy_product
        setBuyProduct: (state, action) => {
            state.buy_product = action.payload;
        },

        // Update category
        setCategories: (state, action) => {
            state.categories = action.payload;
        },

        // Update selected category
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },

        // Update products according to price filter
        setPricefilterProduct: (state, action) => {
            if (action.payload === "LowToHigh") {
                const lowtohigh_sort = [...state.products].sort((a, b) => a.price - b.price);
                state.products = lowtohigh_sort;
            } else if (action.payload === "HighToLow") {
                const hightolow_sort = [...state.products].sort((a, b) => b.price - a.price);
                state.products = hightolow_sort;
            } else if (action.payload === "Default") {
                state.products = oldProductData;
            }
            else if (action.payload === "Newest") {
                state.products = [...state.products].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            } else {
                state.products = [...state.products];
            }
        },
    },
});

export const { setProducts,setModificationProduct, setBuyProduct, setCategories, setPricefilterProduct, setTimeFilterProduct, setSelectedCategory } = ProductSlice.actions;
export default ProductSlice.reducer;
