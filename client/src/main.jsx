import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/Store.js";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById("root")).render(
  
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
     <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  </GoogleOAuthProvider>
);
