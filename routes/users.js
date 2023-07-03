import express from "express";
import { isauthenticated } from "../middlewares/auth.js";
import { getmyprofile, login, logout, register } from "../controllers/users.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isauthenticated, getmyprofile);

export default router;
