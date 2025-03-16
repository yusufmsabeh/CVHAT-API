import connection from "../database/connection.js";
import { DataTypes } from "sequelize";
import Review from "./Review.js";
import { format, parseISO } from "date-fns";

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
  createdAt: {
    type: DataTypes.DATE,
    get() {
      const parsedDate = parseISO(this.dataValues.createdAt.toISOString());
      return format(parsedDate, "dd MMM yyyy");
    },
  },
});
export default Comment;
