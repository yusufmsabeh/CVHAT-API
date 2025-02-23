import connection from "../database/connection.js";
import { DataTypes } from "sequelize";
import CV from "./CV.js";
import Comment from "./Comment.js";

const Review = connection().define("Review", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isAI: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Review;
