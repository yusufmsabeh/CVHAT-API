import connection from "../database/connection.js";
import { DataTypes } from "sequelize";
import CV from "./CV.js";
import Review from "./Review.js";
const User = connection().define("User", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name",
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "last_name",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: "email",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "password",
  },
});

export default User;
