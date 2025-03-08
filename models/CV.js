import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const CV = connection().define("CV", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverImageUrlHigh: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "cover_image_url_high",
  },
  coverImageUrlLow: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "cover_image_url_low",
  },
});

export default CV;
