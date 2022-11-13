import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import config from "../config";

import User from "./user.model";

dotenv.config();

const sequelize = new Sequelize({
  database: config.database,
  dialect: "mysql",
  username: config.username,
  password: config.password,
  models: [User],
});

export { sequelize, User };
