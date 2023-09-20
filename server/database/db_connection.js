import mysql from "mysql2";

//config kết nối database
export const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "drupal7_demo",
  port: 3306,
});
