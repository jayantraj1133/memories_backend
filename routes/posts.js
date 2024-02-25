import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  updateLikes,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", updateLikes);

export default router;
