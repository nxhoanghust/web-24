const express = require("express");
const postModel = require("./posts.model");

const postRouter = express.Router();

postRouter.get("/get/:postId", (req, res) => {
  postModel
    .findById(req.params.postId)
    .populate("author", "email fullName")
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: true,
          data: data
        });
      }
    });
});
postRouter.get("/get", (req, res) => {
  postModel
    .find({}, null)
    .populate("author", "fullName")
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: true,
          data: data
        });
      }
    });
});
postRouter.post("/update", (req, res) => {
  postModel.findById(req.body._id, { view: req.body.view });
});
postRouter.post("/create", (req, res) => {
  //check user login
  req.session.currentUser = {
    _id: req.body.currentUser._id,
    email: req.body.currentUser.email,
    fullName: req.body.currentUser.fullName
  };
  console.log(req.session.currentUser);
  if (req.session.currentUser && req.session.currentUser._id) {
    //create post
    const newPost = {
      // createAt:date
      content: req.body.content,
      //view: num
      imageUrl: req.body.imageUrl,
      author: req.session.currentUser._id
      //author:User
    };
    postModel.create(newPost, (error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: true,
          data: data
        });
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: "Unauthenticated"
    });
  }
});

module.exports = postRouter;
