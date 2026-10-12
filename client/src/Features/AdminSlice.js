import { createSlice } from "@reduxjs/toolkit";

const initState = {
    admin: JSON.parse(localStorage.getItem('admin')) || null,
    isAdmin: JSON.parse(localStorage.getItem('isAdmin')) || false
}
 
export const adminSlice = createSlice({
    name: "admin",
    initialState: initState,

    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload; 
            state.isAdmin = true; 
            localStorage.setItem('admin', JSON.stringify(state.admin));
            localStorage.setItem('isAdmin', JSON.stringify(state.isAdmin));
        },
        
        logoutAdmin: (state) => {
            state.admin = null;
            state.isAdmin = false;
            
            localStorage.removeItem('admin');
            localStorage.removeItem('isAdmin');
        }
    }
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;