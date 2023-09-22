const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
const routes = require("./routes/Route.js");
const { limit } = require("./middleware/rateLimit.js");
env.config();
const PORT =  8000;
const URI = process.env.URI;

//connection of mongoDB
mongoose.connect(URI).then(() => {
  console.log("mongoDb connected");
});

const app = express();

// using cors
app.use(cors());

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(limit)

app.use('/',routes)
app.use("/images", express.static(__dirname + "/uploads"));

app.listen(8000, () => {
  console.log(`Server was connected on PORT ${PORT}`)
});
