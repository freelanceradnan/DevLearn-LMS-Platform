import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/ApiSlice";
import { authSlice } from "../Features/AuthSlice";
import { CartSlice } from "../Features/CartSlice";
import WishListSlice, { AddToWishList } from "../Features/WishSlice";
import { adminSlice } from "../Features/AdminSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    auth:authSlice.reducer,
    admin:adminSlice.reducer,
    AddToCart:CartSlice.reducer,
    AddToWish:WishListSlice.reducer
  },
  middleware: (gdm) => gdm().concat(ApiSlice.middleware),
});
export default store;