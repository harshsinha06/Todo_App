import { UserModel } from "./db.js";

import pkg from 'jsonwebtoken';
const { verify } = pkg;
export const JWT_SECRET = "asdf@123";

export async function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json(
            { message: "You are not logged in" }
        );
    }

    try {
        const decodedData = verify(token, JWT_SECRET);
        const user = await UserModel.findOne({ _id: decodedData.id });

        if (!user) {
            return res.status(401).json({ message: "Invalid user" });
        }
        req.user = user;
        req.userId = decodedData.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}

