import dotenv from "dotenv";
import { Dialect } from "sequelize/types";

dotenv.config();

const env: string = process.env.NODE_ENV || "development";

interface Config {
  username: string;
  password: string;
  database: string;
  define: object;
  logging: boolean;
}

const config: Config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  define: {
    underscore: true,
  },
  logging: false,
};

export default config;
