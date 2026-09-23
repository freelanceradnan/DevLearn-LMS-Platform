import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/ApiSlice";
import { authSlice } from "../Features/AuthSlice";
import { CartSlice } from "../Features/CartSlice";
import WishListSlice, { AddToWishList } from "../Features/WishSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    auth:authSlice.reducer,
    AddToCart:CartSlice.reducer,
    AddToWish:WishListSlice.reducer
  },
  middleware: (gdm) => gdm().concat(ApiSlice.middleware),
});
export default store;