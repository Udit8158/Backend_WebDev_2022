const express = require("express");
const checkAccess = require("../middlewares/checkAccess");
const Posts = require("../models/Posts");
const router = express();

router
  .route("/")
  .get(async (req, res) => {
    console.log(req.user);
    try {
      const posts = await Posts.find({});
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const newPost = new Posts({
        title: req.body.title,
        description: req.body.description,
        author: req.user.username,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;

    try {
      const post = await Posts.findOne({ _id: id });
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .delete(checkAccess, async (req, res) => {
    const id = req.params.id;

    try {
      await Posts.deleteOne({ _id: id });
      res.json(`Post with id ${id} has been deleted`);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  })
  .put(checkAccess, async (req, res) => {
    const id = req.params.id;

    try {
      const post = await Posts.findOneAndUpdate({ _id: id }, { ...req.body });
      res.json(`Post with id ${id} has been updated`);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;
