import connection from "../database/connection.js";
import { DataTypes } from "sequelize";

const OTP = connection().define("OTP", {
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date(new Date().getTime() + 5 * 60000),
  },
});

export default OTP;
