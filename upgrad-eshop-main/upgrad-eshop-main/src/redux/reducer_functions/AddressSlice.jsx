import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    all_address : [],
    selected_address : null
}

const AddressSlice = createSlice({
    name : "addresses",
    initialState,
    reducers:{
        setAll_addresses : (state,action) => {
            state.all_address = action.payload
        },
        setSelected_address : (state,action) => {
            state.selected_address = action.payload
        }
    }
})

export const {setAll_addresses, setSelected_address} = AddressSlice.actions
export default AddressSlice.reducer