import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const Session = connection().define("Session", {
  session_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    required: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    primaryKey: true,
  }
});

export default Session;
