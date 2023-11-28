const asyncHandler = require("express-async-handler");

const Comment = require("../models/commentModel");
const User = require("../models/userModel");

const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ user: req.user.id }); //invoke returns all documents saved in comments model
  res.status(200).json(comments);
});

const setComment = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    //.json({message:'please add a text field'})
    throw new Error("Please add a text field");
  }

  const comment = await Comment.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(comment);
});

const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // if(comment.user.toString() ! == user.id){
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  // const comment =await Comment.findById(req.params.id)
  const comment = Comment.findByIdAndDelete(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  // if(comment.user.toString() ! == user.id){
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }
  // await comment.remove()

  res.status(200).json({ id: req.params.id });
});
module.exports = { getComments, setComment, updateComment, deleteComment };
