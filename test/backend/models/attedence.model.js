import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loginTime: {
        type: Date,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    logoutTime: {
        type: Date
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
