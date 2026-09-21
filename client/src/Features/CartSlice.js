import { createSlice } from '@reduxjs/toolkit';


const getInitialCart = () => {
  try {
    const cart = localStorage.getItem("cart_items");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: getInitialCart(),
  reducers: {
    AddToCart: (state, action) => {
      const product = action.payload; 
    
      const isExists = state.find(c => c._id === product._id);
      
      if (!isExists) {
        state.push(product);
        localStorage.setItem('cart_items', JSON.stringify(state));
      }
    },
    RemoveToCart:(state,action)=>{
    const product=action.payload
    const updatedProduct=state.filter((item)=>item._id!==product._id)
    localStorage.setItem('cart_items', JSON.stringify(updatedProduct));
    return updatedProduct
    }
  }
});

export const { AddToCart,RemoveToCart} = CartSlice.actions;
export default CartSlice.reducer;