import {
  Model,
  PrimaryKey,
  Column,
  Table,
  Length,
  AutoIncrement,
  AllowNull,
  Unique,
} from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

@Table({})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.FLOAT)
  id: number;

  @Length({ min: 3, max: 255 })
  @AllowNull(false)
  @Column(DataType.TEXT)
  firstname: string;

  @Length({ min: 3, max: 255 })
  @AllowNull(false)
  @Column(DataType.TEXT)
  lastname: string;

  @Length({ min: 4, max: 255 })
  @AllowNull(false)
  @Unique({
    name: "username",
    msg: "unique constraint",
  })
  @Column(DataType.TEXT)
  email: string;

  @Length({ min: 4, max: 255 })
  @AllowNull(false)
  @Column(DataType.TEXT)
  password: string;
}
