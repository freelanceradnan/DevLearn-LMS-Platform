import { createSlice } from "@reduxjs/toolkit";

const initState={
    user:JSON.parse(localStorage.getItem('user'))||null,
    isAuthenticate:JSON.parse(localStorage.getItem('isAuthenticate'))||false
}
  
export const authSlice=createSlice({
   name:"auth",
   initialState:initState,

   reducers:{
    setUser:(state,action)=>{
    state.user=action.payload
    state.isAuthenticate=true
    localStorage.setItem('user',JSON.stringify(state.user))
    localStorage.setItem('isAuthenticate',JSON.stringify(state.isAuthenticate))
    },
    logoutUser:(state,action)=>{
    state.user=null,
    state.isAuthenticate=false
    
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticate')
    }
   }
})
export const {setUser,logoutUser}=authSlice.actions