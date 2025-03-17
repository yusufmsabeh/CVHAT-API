import connection from "../database/connection.js";
import { DataTypes } from "sequelize";
import { format, parseISO } from "date-fns";

const CV = connection().define("CV", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
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
    allowNull: true,
    field: "cover_image_url_high",
  },
  coverImageUrlLow: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "cover_image_url_low",
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      const parsedDate = parseISO(this.dataValues.createdAt.toISOString());
      return format(parsedDate, "dd MMM yyyy");
    },
  },
});

export default CV;
