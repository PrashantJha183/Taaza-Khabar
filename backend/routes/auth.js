const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const validator = require("validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchData = require("../middleware/fetchData");
const JWT_SECRET = "Meri marzi";
const router = express.Router();

//------------------Create a user using a post request "api/auth/createuser" doesn't require login----------------------------
router.post(
  "/signup",
  [
    body("name").notEmpty().escape().isLength({ min: 3 }),
    body("email").notEmpty().escape().isEmail().isLength({ min: 5 }),
    body("password").notEmpty().escape().isLength({ min: 8 }),
  ],

  //req -> request send by the user to the backend and res -> response send by the user from the backend
  async (req, res) => {
    //---------------Verifying validation-----------------
    //Verifying error and returning it
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      //--------Verifying email which user had typed with the existing email in the database
      //Check if the user with email already exists
      let userEmail = await User.findOne({ email: req.body.email });
      if (userEmail) {
        return res
          .status(400)
          .json({ error: "User with this email already exist" });
      }

      //---------------Password hashing and genrating salt using bcryptjs------------------------
      //generating salt using bcryptjs
      const salt = await bcrypt.genSalt(10);

      //hashing a paswword and adding salt using bcrptyjs
      const securePassword = await bcrypt.hash(req.body.password, salt);

      //If no error found then the user got created and stored the information in the database
      const { name, email } = req.body;
      const user = await User.create({ name, email, password: securePassword });

      //-------------------------------After creating user one authentication token will generate which work like a session----------------------------------------
      //requesting user id from the database with the credentials entered byt the user
      const data = {
        user: {
          id: user.id,
        },
      };
      console.log("Data: ", data);

      //signing the authentication token for authToken generation
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("authToken: ", authToken);
      let success = true;

      //after creating user account one authentication token will generate and that token wil be send to the user for verfication
      res.json({ success, authToken });
    } catch (err) {
      console.error("Error message for signup route", err.message);
      res.status(500).send("Server Error");
    }
  }
);

//------------------Authenticating a user "api/auth/login" require login----------------------------
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],

  //req -> request send by the user to the backend and res -> response send by the user from the backend
  async (req, res) => {
    //---------------Verifying validation-----------------
    //Verifying error and returning it
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      //--------Verifying email and password which user had typed with the existing email and password in the database---------------
      const { email, password } = req.body;
      //Verifying if the email address is correct
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }

      //comparing password entered by the user with the password exist of that user in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }

      //-------------------------------After successful login one authentication token will generate which work like a session----------------------------------------
      //requesting user id from the database with the credentials entered by the user
      const payload = {
        user: {
          id: user.id,
        },
      };
      console.log("Payload data: ", payload);

      //signing the authentication token for authToken generation
      const authToken = jwt.sign(payload, JWT_SECRET);
      console.log("authToken after login: ", authToken);

      //after login one authentication token will generate and that token will be sent to the user for verification
      res.json(authToken);
    } catch (err) {
      console.error("Error message for login route", err.message);
      res.status(500).send("Server Error");
    }
  }
);

//----------------Get logged-in user details   "/api/auth/fetchuserdata"   login required------------------------
router.post("/fetchuserdata", fetchData, async (req, res) => {
  try {
    //fetching user id from the authentication token generated after login using fetchData function from the middleware function
    const userid = req.user.id;
    console.log(
      "User id in fetchuserdata route using fetchData middleware",
      userid
    );

    //Selecting name from database by fetching id from generated authToken after login by using userid variable
    const userId = await User.findById(userid).select("name");
    res.json(userId);
  } catch (error) {
    console.error("Error message for fetchuserdata route: ", error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
