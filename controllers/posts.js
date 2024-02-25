import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find({});
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Post with that id");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "post deleted successfully" });
};

export const updateLikes = async (req, res) => {
  try {
    const { id } = req.params;
    const postData = await PostMessage.findById(id);
    if (postData) {
      const updatedPost = await PostMessage.findOneAndUpdate(
        { _id: id },
        {
          likeCount: postData.likeCount + 1,
        },
        { new: true }
      ).lean();

      res.json(updatedPost);
    }
  } catch (error) {
    console.log("e----errorr---", error);
  }
};
