import express from "express";
import { handleLogin, handleLoginVerification } from "../controllers/common";

const router = express.Router();


router.post('/login',handleLogin)

router.post('/verify-otp',handleLoginVerification)


router.get('/verify',handleLoginVerification)


export default router;