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
  //sort by
  const pageNumber = Number(req.query.pageNumber);
  const pageSize = Number(req.query.pageSize);
  //validate
  if (isNaN(pageNumber) || isNaN(pageSize)) {
    res.status(500).json({
      success: false,
      message: "Page Number and Page Size is invalid"
    });
  }
  if (pageNumber < 1 || pageSize < 1 || pageSize > 20) {
    res.status(500).json({
      success: false,
      message: "Page Number and Page Size is invalid"
    });
  }
  //query db 1-inc -1-decrease
  postModel
    .find({}, null)
    .sort({ createAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .populate("author", "fullName")
    .exec((error, data) => {
      if (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      } else {
        postModel
          .find({})
          .countDocuments()
          .exec((error, total) => {
            if (error) {
              res.status(500).json({
                success: false,
                message: error.message
              });
            } else {
              res.status(200).json({
                success: true,
                data: data,
                total: total
              });
            }
          });
      }
    });
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
