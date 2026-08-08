import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../Features/ApiSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (gdm) => gdm().concat(ApiSlice.middleware),
});
export default store;
