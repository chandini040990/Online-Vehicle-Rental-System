import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin, isOwner } from "../middlewares/auth.js";
// controllers
import {
  register,
  login,
  secret,
  updateProfile,
  getBookings,
  ownerBookings,
  allBookings,
  updateFeedback,
  getFeedback,
} from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});
router.get("/owner-check", requireSignin, isOwner, (req, res) => {
  res.json({ ok: true });
});

router.put("/profile", requireSignin, updateProfile);

// testing
router.get("/secret", requireSignin, isAdmin, secret);

// Bookings
router.get("/bookings", requireSignin, getBookings);
router.get("/owner/bookings", requireSignin, isOwner, ownerBookings);
router.get("/all-bookings", requireSignin, isAdmin, allBookings);

// feedback
router.post("/feedback/update", requireSignin, updateFeedback);
router.get("/feedback/get", getFeedback);


export default router;
