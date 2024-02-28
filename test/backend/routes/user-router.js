import express from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import Attendance from "../models/attedence.model.js";
const Router = express.Router();


Router.post("/register", async (req, res) => {
    const { username, password, email, phone } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (user) {
            return res.status(404).send("User Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            email,
            phone
        });

        res.status(200).send(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Registration failed");
    }
});

Router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user by username
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return error
        if (!passwordMatch) {
            return res.status(401).send("Invalid password");
        }

        // Passwords match, so return success message
        res.status(200).send(user._id);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Login failed");
    }
});


// Router.get('/user-logs', async (req, res) => {
//     try {
//         // Find all users and populate their attendance records
//         const users = await userModel.find({}).populate("attendence");

//         res.status(200).json({ users });
//     } catch (error) {
//         console.error('Failed to fetch user logs:', error.message);
//         res.status(500).json({ message: 'Failed to fetch user logs' });
//     }
// });


Router.get('/user-logs', async (req, res) => {
    try {
        // Find all users
        const users = await userModel.find({});

        // Create an array to store promises for fetching attendance records
        const promises = users.map(async (user) => {
            // Fetch attendance records for each user
            const userAttendance = await Attendance.find({ userId: user._id });
            return { user: user.username, attendance: userAttendance };
        });

        // Execute all promises concurrently
        const userLogs = await Promise.all(promises);

        res.status(200).json({ userLogs });
    } catch (error) {
        console.error('Failed to fetch user logs:', error.message);
        res.status(500).json({ message: 'Failed to fetch user logs' });
    }
});



export default Router;
