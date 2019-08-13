const express = require("express");
const multer = require("multer");
const fs = require("fs");
const uploadRouter = express.Router();
const upload = multer({
  dest: "public"
});
uploadRouter.post("/image", upload.single("image"), (req, res) => {
  //console.log(req.file);
  var type = req.file.originalname.split(".").pop();
  var newNameFile = req.file.filename + "." + type;
  //console.log(newNameFile);
  fs.rename(`public/${req.file.filename}`, `public/${newNameFile}`, err => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          imageUrl: `http:/localhost:3001/${newNameFile}`
        }
      });
    }
  });
});
module.exports = uploadRouter;
