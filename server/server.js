import express, { json } from "express";
import cors from "cors";
import { config } from 'dotenv';

import userRoutes from "./routes/users";
import todoRoutes from "./routes/todos";

config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

import { connect } from "mongoose";
connect(MONGO_URI);

const app = express();



app.use(json());
app.use(cors({origin: '*'}));

app.use(userRoutes);
app.use(todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});