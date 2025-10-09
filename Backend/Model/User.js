const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },

  name: {
    type: String,
  },

  googleId: {
    type: String,
  },

  password: {
    type: String,
  },

  provider: {
    type: String,
    enum: ["google", "email"],
  },

  socialId: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
