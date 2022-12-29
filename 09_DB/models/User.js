const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    refreshToken: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
