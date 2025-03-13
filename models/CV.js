import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const CV = connection().define("CV", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  folderName: {
    type: DataTypes.STRING,
    allowNull: false,
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
