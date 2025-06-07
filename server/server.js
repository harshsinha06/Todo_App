import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import todoRoutes from "./routes/todos.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

await mongoose.connect(MONGO_URI);
const app = express();

app.use(json());
app.use(cors({ origin: '*' }));

app.use(userRoutes);
app.use(todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});