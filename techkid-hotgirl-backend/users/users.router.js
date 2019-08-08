const express = require("express");
const UserModel = require("./users.model");
const bcryptjs = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

const userRouter = express.Router();
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

userRouter.get("/test", (req, res) => {
  console.log("Current User:", req.session.currentUser);
  //console.log(req.session.id);
  var profile = req.session.currentUser;
  //console.log(req.session.cookie);
  if (req.session.currentUser === undefined) {
    res.json({
      success: false
    });
  } else {
    res.json({
      success: true,
      data: profile
    });
  }
});
userRouter.post("/register", (req, res) => {
  // get mail password fullnameform req.body
  const { email, password, fullName } = req.body;

  // validate email, password, fullName
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: "Invalid email adress"
    });
  } else if (!password || password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    });
  } else if (!fullName) {
    res.status(400).json({
      success: false,
      message: "Please input full name"
    });
  } else {
    // check unique email
    UserModel.findOne({ email: email }, (error, data) => {
      if (error) {
        res.json({
          success: false,
          message: error.message
        });
      } else if (data) {
        res.status(400).json({
          success: false,
          message: "Email has been used"
        });
      } else {
        //hash password
        const hashPassword = bcryptjs.hashSync(password, 10);
        //save to db
        UserModel.create(
          {
            ...req.body,
            password: hashPassword
          },
          (err, newUser) => {
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message
              });
            } else {
              res.status(201).json({
                success: true,
                data: {
                  ...newUser._doc,
                  password: ""
                }
              });
            }
          }
        );
      }
    });
  }
});

userRouter.post("/login", (req, res) => {
  const CLIENT_ID =
    "992650410090-m4eo9ap8k0vkm3r4m0mefj3sfdt2jo35.apps.googleusercontent.com";
  //get email+pass from req.boy
  if (req.body.token) {
    console.log(req.body);
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      //console.log(userid);
      console.log(payload);
      //console.log(payload.name);
      //console.log(payload.email);
      // If request specified a G Suite domain:
      //const domain = payload['hd'];
      req.session.currentUser = {
        img: payload.picture,
        _id: userid,
        email: payload.email,
        fullName: payload.name
      };
      console.log(req.session.currentUser);
      res.status(201).json({
        success: true,
        message: "Login successful"
      });
    }
    verify().catch(console.error);
  } else {
    console.log(req.body);
    const { email, password } = req.body;
    //check email
    UserModel.findOne({ email: email }, (error, data) => {
      if (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else if (!data) {
        res.status(400).json({
          success: false,
          message: "Email does not exist"
        });
      } else {
        //compare passw
        if (bcryptjs.compareSync(password, data.password)) {
          //save info to session
          req.session.currentUser = {
            _id: data._id,
            email: data.email,
            fullName: data.fullName
          };
          //console.log(req.session.id);
          //console.log('Current User:', req.session.currentUser);
          res.status(201).json({
            success: true,
            message: "Login successful"
          });
        } else {
          res.status(400).json({
            success: false,
            message: "Password incorrect"
          });
        }
      }
    });
  }
});

userRouter.get("/logout", (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Logout success"
      });
    }
  });
});

module.exports = userRouter;
