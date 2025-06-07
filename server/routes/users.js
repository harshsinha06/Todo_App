import { Router } from "express";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { UserModel, OtpModel } from "../db";
import { JWT_SECRET, auth } from "../auth";
import { sendOtpEmail } from "../sendMail";

const router = Router();

router.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    try {
        const hashedpassword = await hash(password, 10);
        await UserModel.create({
            name: name,
            email: email,
            password: hashedpassword
        });

        res.json({
            message: "You are Signed Up"
        });
    }

    catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                message: "Email already in use"
            });
        } else {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
});

router.post("/send-otp", async (req, res) => {
    const email = req.body.email;
    console.log("OTP request received for:", email);

    try {
        const otp = await sendOtpEmail(email);
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (err) {
        console.error("Failed to send OTP:", err);
        res.status(500).json({ message: "Failed to send OTP" });
    }
});



router.post("/verify-otp", async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const otpRecord = await OtpModel.findOne({ email }).sort({ createdAt: -1 });
    
    if (!otpRecord) {
        return res.status(404).json({ message: "OTP record not found" });
    }

    if (otpRecord.otp !== otp) {
        return res.status(401).json({ message: "Invalid OTP" });
    }

    await OtpModel.deleteMany({ email });
    return res.status(200).json({
        message: "OTP verified successfully"
    });
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
    })

    if (!user) {
        return res.status(401).json({
            message: "User does not exists"
        });
    }

    const passwordMatch = await compare(password, user.password)

    if (passwordMatch) {
        const token = sign({
            id: user._id.toString()
        }, JWT_SECRET);

        res.json({
            token: token
        });
    }

    else {
        res.status(401).json({
            message: "Invalid Credentials"
        });

    }
});


router.get("/me", auth, async (req, res) => {
    const user = req.user;

    return res.json({
        name: user.name
    });
});

export default router;