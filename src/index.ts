import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { sequelize } from "../src/models/index";
import userRouter from "./routes/user.route";
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;
app.use(express.json());
app.use(helmet.hidePoweredBy());
app.use(cors());
app.use(cookieParser());

app.use("/auth", userRouter);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`express server has started on port ${port}`);
  });
});
