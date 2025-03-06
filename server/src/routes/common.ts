import express from "express";
import { handleLogin, handleLoginVerification, handleUserVerification, resetSeats } from "../controllers/common";

const router = express.Router();


router.post('/login',handleLogin)

router.post('/verify-otp',handleLoginVerification)


router.get('/verify',handleUserVerification)

router.get('/reset-seat',resetSeats)


export default router;