import { createSlice } from "@reduxjs/toolkit";
const InitialState=()=>{
    try {
        const wishlist=localStorage.getItem('wish_item')
     return wishlist?JSON.parse(wishlist):[]
    } catch (error) {
        return []
    }
}

const WishListSlice=createSlice({
    name:'wishlist',
    initialState:InitialState(),
    reducers:{
    AddToWishList:(state,action)=>{
    const product=action.payload
    const IsExists=state.find((item)=>item._id==product._id)
    if(!IsExists){
    state.push(product)
    localStorage.setItem('wish_item',JSON.stringify(state))
    }
    },
    RemoveFromWishList:(state,action)=>{
    const product=action.payload
    const updateProduct=state.filter((c)=>c._id!==product._id)
    localStorage.setItem('wish_item',JSON.stringify(updateProduct))
    return updateProduct
    },
    ClearWishList:(state,action)=>{
    localStorage.removeItem('wish_item')
    return []
    }
    }
})
export const {AddToWishList,RemoveFromWishList,ClearWishList}=WishListSlice.actions
export default WishListSlice