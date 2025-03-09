import connection from "../database/connection.js";
import { DataTypes } from "sequelize";
import Review from "./Review.js";

const Comment = connection().define("Comment", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
export default Comment;
