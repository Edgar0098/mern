const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Register User
//route  DELETE/api/comments/:id
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log(name, email);
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // res.json({messsage:'Register User'})
});

//Authenticate user
//@Route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new error("invalid credentials");
  }

  // res.json({ messsage: "Login User" });
});
// Get user data
// @route GET/api/users/me
//@access Public

const getMe = asyncHandler(async (req, res) => {
  //res.json({ messsage: "User data display" });
  console.log("jjjj");
  const {_id,name,email} = await User.findById(req.user.id)

  res.status(200).json({
    id:_id,
    name,
    email,
  })
});

const updateUser = asyncHandler(async (req, res) => {
  //res.json({ messsage: "User data display" });
  console.log(req.params.id, "param id");
  // const {_id,name,email} = await User.findById(req.user.id)

  // res.status(200).json({
  //   id:_id,
  //   name,
  //   email,
  // })
console.log(User)

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedUser);
});




//Generate JWT
const generateToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: '30d',

  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser
};
