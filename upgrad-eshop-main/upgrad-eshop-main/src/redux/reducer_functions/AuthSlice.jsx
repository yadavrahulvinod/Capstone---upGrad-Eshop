import { createSlice } from "@reduxjs/toolkit"

// intitialstate of user 
const initialState = {
    isAuthenticated : false,
    isAdmin : false,
    ErrorMessege : ''
}

// main function
const AuthSlice = createSlice({
    name:'Auth',
    initialState,
    reducers:{ 

        // update is user logged in state
        setisAuthenticated : (state,action) =>{
            state.isAuthenticated = action.payload;
        },

        // give error messege if any
        setErrorMessege :(state,action)=>{
            state.ErrorMessege=action.payload;
        },

        // update if user is admin
        setisAdmin : (state,action)=>{
            state.isAdmin = action.payload;
        }
    }
})

export const { setisAdmin,setisAuthenticated,setErrorMessege } = AuthSlice.actions;
export default AuthSlice.reducer;
