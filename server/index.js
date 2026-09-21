import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import router from "./Route/Router.js";
import { ConnectDB } from "./App/Config/ConnectDB.js";
import ErrorMiddleware from "./App/Middleware/ErrorMiddleware.js";
import Stripe from "stripe";
import { Webhook } from "./App/Webhooks/Webhooks.js";
dotenv.config();
const PORT = process.env.PORT || "5000";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//create instence
const app = express();
//middlewares
app.use(hpp());
app.use(cors({ 
  origin: 'http://localhost:5173',
  credentials: true 
}));
app.use(helmet());
app.use(cookieParser())
//webhooks call
app.post('/api/webhook',express.raw({type:'application/json'}),Webhook)
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3000,
  message: "Max request From this IP!",
});
app.use(rateLimiter);
app.set("etag", false);
//connection db
ConnectDB();

//connenction router
app.use("/api", router);
//unknow router
app.all(/(.*)/, (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});
app.use(ErrorMiddleware);
//create server
app.listen(PORT, () => {
  console.log(`app is listend on ${PORT} server`);
});
