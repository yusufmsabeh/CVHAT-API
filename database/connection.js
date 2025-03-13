import { Sequelize } from "sequelize";
import dotenv from "dotenv";
let connection;
function getConnection() {
  dotenv.config();
  if (!connection) {
    connection = new Sequelize({
      dialect: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      dialectOptions: {
        ssl: {
          ssl: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        timestamps: true,
        freezeTableName: true,
      },
      logging: false,
    });
  }
  return connection;
}
export default getConnection;
