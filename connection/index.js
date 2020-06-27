const mysql = require("mysql");

module.exports = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_MYSQL,
});
