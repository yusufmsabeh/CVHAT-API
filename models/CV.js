import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const CV = connection().define("CV", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  URL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverURL: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "cover_URL",
  },
});

export default CV;
