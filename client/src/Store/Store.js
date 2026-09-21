import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/ApiSlice";
import { authSlice } from "../Features/AuthSlice";
import { CartSlice } from "../Features/CartSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    auth:authSlice.reducer,
    AddToCart:CartSlice.reducer
  },
  middleware: (gdm) => gdm().concat(ApiSlice.middleware),
});
export default store;