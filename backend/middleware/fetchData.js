const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Meri marzi";
const fetchData = (req, res, next) => {
  try {
    //-------------Fetch id from authentication token which will help for fetching user details by adding id to the req header------------
    //verfying that the authToken is generated for the logged-in user
    const token = req.header("authToken");
    if (!token) {
      res.status(401).json({ error: "access denied" });
    }

    // fetching user data with generated authToken by verifying the authToken and sending the user data to req.user so that it can
    // use in fetchuserdata router
    const data = jwt.verify(token, JWT_SECRET);
    console.log("JWT verified data: ", data);
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "access denied" });
  }
};

module.exports = fetchData;
