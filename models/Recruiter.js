import connection from "../database/connection.js";
import { DataTypes } from "sequelize";
import Review from "./Review.js";
import User from "./User.js";

const Recruiter = connection().define("Recruiter", {
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

export default Recruiter;
