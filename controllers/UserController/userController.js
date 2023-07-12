import bycrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Users from "../../models/users/Users.js";

dotenv.config();

export const getAllUsers = async (req, res, next) => {
  let users;

  try {
    users = await Users.find();
  } catch (err) {
    console.log("err in catch block of getAllUsers => ", err);
    return res.status(500).json({
      error: err,
      message: "There was some error while fetching the all users",
    });
  }

  if (!users) {
    return res.status(400).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Users.findOne({ email });
  } catch (err) {
    console.log("err while finding existingUser => ", err);
    return res
      .status(400)
      .json({ message: "There was some error", error: err });
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Login Instead" });
  }

  const hashedPassword = bycrypt.hashSync(password);
  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log("error in  saving new user => ", newUser);
    return res.status(400).json({ message: "Signup Failed", error: err });
  }

  return res.status(201).json({ newUser });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await Users.findOne({ email });
  } catch (err) {
    console.log("Some error while fetching existingUser by email => ", err);
    return res.status(400).json({
      message: "Some error while fetching existingUser by email",
      error: err,
    });
  }

  if (!existingUser) {
    return res.status(400).json({
      message: "User could not be found by this email",
    });
  }

  const isPasswordCorrect = bycrypt.compareSync(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
      name: existingUser.name,
      email: email,
    },
    process.env.USERMAPS_SECRET_KEY,
    { expiresIn: "30d" }
  );

  return res
    .status(200)
    .json({ message: "Login Successful", token: token, user: existingUser });
};
