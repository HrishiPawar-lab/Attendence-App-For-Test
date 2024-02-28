import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        min: 10,
        required: true
    },
    isAdmin: {
        type: Boolean,
    },
    attendence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance'
    }
})

const userModel = mongoose.model('User', userSchema);
export default userModel