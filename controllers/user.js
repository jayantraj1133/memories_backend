import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing_user = await User.findOne({ email });

    if (!existing_user) {
      return res.send(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existing_user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }
    const token = jwt.sign(
      {
        email: existing_user.email,
        id: existing_user._id,
      },
      "TEST",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existing_user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wromg" });
  }
};

export const signup = async (req, res) => {};
