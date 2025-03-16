import connection from "../database/connection.js";
import { DataTypes } from "sequelize";
import { format, parse, parseISO } from "date-fns";

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
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      const parsedDate = parseISO(this.dataValues.createdAt.toISOString());
      return format(parsedDate, "dd MMM yyyy");
    },
  },
});

export default Review;
