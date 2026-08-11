import { createSlice } from "@reduxjs/toolkit";

const initState={
    user:null,
    isAuthenticate:false
}
  
export const authSlice=createSlice({
   name:"auth",
   initialState:initState,

   reducers:{
    setUser:(state,action)=>{
    state.user=action.payload
    state.isAuthenticate=true
    },
    logoutUser:(state,action)=>{
    state.user=null,
    state.isAuthenticate=false
    }
   }
})
export const {setUser,logoutUser}=authSlice.actions