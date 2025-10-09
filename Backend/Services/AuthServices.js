const express = require("express");
const passport = require("passport");
const app = express();
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(passport.session());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/health", (req, res) => {
  res.json({
    status: "Auth Services are working",
    timestamp: new Date().toISOString(),
  });
});

// endpoint to register with email and password
app.post("/register", async (req, res) => {
  try {
    let success = false;
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      email,
      name,
      password,
      provider: "email",
    });
    await user.save();
    success = true;
    res
      .status(201)
      .json({ message: "User registered successfully", success: success });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// endpoint to login with email and password
app.post("/login", async (req, res) => {
  try {
    let success = false;
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    success = true;
    res
      .status(200)
      .json({ message: "Login successful", token, success: success });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// endpoint to initiate Google OAuth2 login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const { user, isNewUser } = req.user;
      let success = false;
      if (isNewUser) {
        const newUser = new User(user);
        await newUser.save();
        success = true;
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.redirect(`http://localhost:5173/dashboard?token=${token}`);

    } catch (err) {
      console.error("Error in callback:", err);
      res.redirect("http://localhost:5173/login?error=1");
    }
  }
);

module.exports = app;
