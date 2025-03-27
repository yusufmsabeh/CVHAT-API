import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const RestPasswordToken = connection().define(
  "RestPasswordToken",
  {
    token_id: {
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
    },
    expiresAt: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(new Date().getTime() + 5 * 60000),
    },
  },
  {
    tableName: "reset_password_token",
  },
);

export default RestPasswordToken;
