const express = require("express");
const cors = require("cors");
require('dotenv').config();

const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todos");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const mongoose = require("mongoose");
mongoose.connect(MONGO_URI);

const app = express();



app.use(express.json());
app.use(cors({origin: '*'}));

app.use(userRoutes);
app.use(todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});