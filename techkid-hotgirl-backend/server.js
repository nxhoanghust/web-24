const express = require("express");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const userRouter = require("./users/users.router");
const session = require("express-session");
//const cors = require("cors");
mongoose.connect("mongodb://localhost:27017/techkid-hotgirl", error => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connect to mongodb sucess");

    const app = express();

    //use middleware
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });
    /*res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers":
          "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
      });*/

    /*app.use(
      cors({
        origin: "http://localhost:3000"
      })
    );
    app.options("*", cors());*/
    app.use(bodyParser.json());
    app.use(
      session({
        secret: "keyboard cat"
      })
    );
    //router
    app.use("/users", userRouter);

    // start sv
    app.listen(3001, error => {
      if (error) {
        throw error;
      } else {
        console.log("Server listen on port 3001....");
      }
    });
  }
});
