import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user-router.js"
import attendeRouter from "./routes/attendence.js"

import cors from "cors"
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "12mb" }));
app.use("/api/v1/users", userRouter)
app.use("/api/v1/attendence", attendeRouter)




mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log("listening on port  " + port);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


