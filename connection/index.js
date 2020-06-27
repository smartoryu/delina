const mysql = require("mysql");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "paksi",
  password: "jaladara",
  database: "delina_muslim"
});
