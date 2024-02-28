import express from "express";
import Attendance from "../models/attedence.model.js";
import userModel from "../models/user.model.js";
const router = express.Router();

router.post("/signin", async (req, res) => {
    const { userId, loginTime } = req.body;

    try {
        const signInRecord = await Attendance.create({ userId, loginTime });
        res.status(201).json({ message: "Sign-in time saved successfully", attendance: signInRecord });
    } catch (error) {
        console.error("Failed to save sign-in time:", error.message);
        res.status(500).json({ message: "Failed to save sign-in time" });
    }
});

router.post("/signout", async (req, res) => {
    const { userId, logoutTime } = req.body;

    try {
        let latestRecord = await Attendance.findOne({ userId }).sort({ loginTime: -1 });

        if (!latestRecord) {
            return res.status(404).json({ message: "No sign-in record found for the user" });
        }

        latestRecord.logoutTime = logoutTime;
        await latestRecord.save();

        res.status(200).json({ message: "Logout time saved successfully", attendance: latestRecord });
    } catch (error) {
        console.error("Failed to save logout time:", error.message);
        res.status(500).json({ message: "Failed to save logout time" });
    }
});
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all attendance records for the specified user
        const userAttendance = await Attendance.find({ userId });

        if (userAttendance.length === 0) {
            return res.status(404).json({ message: "No attendance records found for the user" });
        }

        res.status(200).json({ message: "Attendance records found", attendance: userAttendance });
    } catch (error) {
        console.error("Failed to fetch attendance records:", error.message);
        res.status(500).json({ message: "Failed to fetch attendance records" });
    }
});




export default router;
