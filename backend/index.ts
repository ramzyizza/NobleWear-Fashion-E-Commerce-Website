import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute";
import AuthRoute from "./routes/AuthRoute";
import OrderController from "./routes/OrderRoute";
import bodyParser from "body-parser";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ProductRoute);
app.use(OrderController);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("SERVER UP AND RUNNING");
});
