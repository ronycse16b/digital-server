const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const IsAuthenticUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user.roles === "user" || user.roles === "admin") {
      next();
    } else if (user.roles === "pending") {
      res.status(201).send( {role:'pending'});
    } 
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in user middleware",
    });
  }
};



module.exports = { IsAuthenticUser };
