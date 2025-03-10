import express from "express";
import { handleLogin, handleLoginVerification, handleUserVerification } from "../controllers/common";

const router = express.Router();


router.post('/login',handleLogin)

router.post('/verify-otp',handleLoginVerification)


router.get('/verify',handleUserVerification)



export default router;