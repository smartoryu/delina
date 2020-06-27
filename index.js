// import module global
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// setting app
const app = express();

// test connection database
const db = require("./connection");
db.connect(err => {
  if (err) throw err;
  console.log("my sql connected");
});

// setting cors
app.use(cors());

// setting middleware (untuk req.body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// setting routes
const { ProductRouter } = require("./routes");
app.get("/", (req, res) => res.send("sudah terhubung dengan backend"));
app.use("/data_product", ProductRouter);

// setting port
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`server running on port: ${PORT}`));
