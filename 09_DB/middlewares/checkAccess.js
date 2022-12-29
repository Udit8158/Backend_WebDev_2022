const Posts = require("../models/Posts");

const checkAccess = async (req, res, next) => {
  try {
    // found the post with the id in DB
    const postId = req.params.id;
    const post = await Posts.findOne({ _id: postId });

    // check post is valid or not
    if (!post) return res.status(404).json("post not found");

    // check access or not
    if (post.author !== req.user.username)
      return res.status(403).json("Forbidden");

    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = checkAccess;
