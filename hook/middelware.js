const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const mongoose = require("mongoose");

const IsAuthenticUser = async (req, res, next) => {

  try {

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.headers.userid)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await UserModel.findById(req.headers.userid);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.roles === "admin") {
      // User is an admin, proceed to the next middleware
      next();
    } else {
      // User is not an admin, send a 403 Forbidden response
      res.status(403).send({
        success: false,
        message: "Permission denied. User is not an admin.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Internal server error in user middleware",
    });
  }
};

module.exports = IsAuthenticUser;




module.exports = { IsAuthenticUser };
