require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes.js");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
