const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const passport = require("./Authcontroller/passport");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

const connectDB = require("./Services/Db");
connectDB();

const authRoutes = require("./Services/AuthServices");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
