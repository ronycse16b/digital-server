const bcryptjs = require("bcryptjs");

const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
  const { name, email, password, security } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new UserModel({
    name,
    email,
    password: hashPassword,
    security,
  });

  const registerUserCheck = await UserModel.findOne({ email });
  if (registerUserCheck) {
    return res.send("Email is already registered");
  }

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Signup Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};



const signInController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return res.status(402).json({
        success: false,
        message: "wrong email",
      });
    }
     
    const checkRoles = await UserModel.findOne({ email, roles: "pending" }).exec();
    if (checkRoles) {
      return res.status(402).json({
        success: false,
        message: "Please wait for Admin Approval, try again",
      });
    } 

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(402).json({
        success: false,
        message: "wrong credentials",
      });
    }

    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    const { password: pass, security: secu, ...data } = validUser._doc || {};

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: 'None',
      secure: false,  // Set to false in a non-HTTPS environment
    });

    // Send a JSON response
    res.status(200).json({ data, message: "Sign-in Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

const allUsersGetController = async (req, res) => {
  try {
    const allUsers = await UserModel.find();

    // Extracting user data excluding password and security fields
    const users = allUsers.map((user) => {
      const { password, security, ...userData } = user._doc;
      return userData;
    });

    res.status(200).send({ success: true, message: "All users found", users });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const singleUserGetController = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    // Extracting user data excluding password and security fields
    const { password, security, ...userData } = user._doc;

    res.status(200).send({ success: true, message: " single user", userData });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ success: false, message: "single user getting error" });
  }
};

const userRoleUpdateController = async (req, res) => {
  try {
    const data = await UserModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    if (data) {
      res.status(200).send({
        success: true,
        message: "User Updated Successfully",
        data,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
    if (deleteUser) {
      res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  signUpController,
  signInController,
  signOut,
  allUsersGetController,
  singleUserGetController,
  userRoleUpdateController,
  deleteUserController
};
