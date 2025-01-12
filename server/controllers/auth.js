import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Booking from "../models/booking.js";
import Feedback from "../models/feedback.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, email, password, role } = req.body;
    // 2. all fields require validation
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }
    // 4. hash password
    const hashedPassword = await hashPassword(password);
    // 5. register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      role,
    }).save();
    // 6. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, password, address, role } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }
    // hash the password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        role: role || user.role,
        address: address || user.address,
      },
      { new: true }
    );

    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const getBookings = async (req, res) => {
  try {
    const booking = await Booking.find({ buyer: req.user._id, status: "Processed" })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(booking);
    // console.log("getbookings to user", booking);
  } catch (err) {
    console.log(err);
  }
};


export const ownerBookings = async (req, res) => {
  try {
    console.log("owner", req.user._id)
    const booking = await Booking.find({ "productData.owner._id": req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(booking);
    // console.log("getbookings to owner", booking);
  } catch (err) {
    console.log(err);
  }
};

export const allBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(bookings);
    // console.log("allbookings", bookings);
  } catch (err) {
    console.log(err);
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({})
      .sort({ createdAt: -1 })
      .limit(3);
    // console.log("feedback", feedback)
    res.json(feedback);
  } catch (err) {
    console.log(err);
  }
};

export const updateFeedback = async (req, res) => {
  try {
    // console.log(req.fields);

    const { name, ratings, reviews } =
      req.body;

    // validation
    switch (true) {
      case !name:
        res.json({ error: "Name is required" });
      case !ratings:
        res.json({ error: "Ratings is required" });
      case !reviews:
        res.json({ error: "Reviews To is required" });
    }

    // create feedback
    const feedback = new Feedback({ ...req.body });

    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
