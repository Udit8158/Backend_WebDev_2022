const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
