import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const Session = connection().define("Session", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true,
    primaryKey: true,
    field:"session_id"
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    primaryKey: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  },
});

export default Session;
