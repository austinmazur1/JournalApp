import { Router } from "express";
const router = Router();

import * as bcrypt from "bcrypt";

import * as jwt from "jsonwebtoken";

import User from "../models/User.model";

import { isAuthenticated } from "../middleware/jwt.middleware";

import { Secret } from "jsonwebtoken";

const saltRounds = 10;

router.post("/signup", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (email === "" || password === "" || name === "") {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ message: "User already exists. Please log in instead." });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userInfo = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    console.log(userInfo);

    const userResponse = {
      _id: userInfo._id,
      email: userInfo.email,
      name: userInfo.name,
      // Add other fields as needed
    };

    res.status(200).json({ success: "User created", user: userResponse });
  } catch (error) {
    console.log("Error creating the user!");
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(401).json({ message: "User not found." });
      return;
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      // Deconstruct the user object to omit the password
      const { _id, email, name } = foundUser;

      // Create an object that will be set as the token payload
      const payload = { _id, email, name };

      const tokenSecret: string = process.env.TOKEN_SECRET || "";

      // Create a JSON Web Token and sign it
      const authToken = jwt.sign(payload, tokenSecret, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send the token as the response
      res.status(200).json({ authToken: authToken });
    }
  } catch (error) {
    console.log("error");
    next(error);
  }
});

router.delete("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log("error deleting user!");
  }
});

export default router;
