const express = require("express");
const app = express();

const auth = require("./middleware/auth");
const userRoutes = require('./routes/userRoutes')

//Dotenv & Database
require("dotenv").config();
require("./config/database").connect();

//Express Json
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//User Routes
app.use('/', userRoutes);


app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

module.exports = app;
