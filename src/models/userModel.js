import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: [true, "Please provide a username"],
        unique: true,
        trim: true
    },
    email: {
        type: string,
        required: [true, "Please provide a email"],
        unique: true,
        trim: true
    },
    password: {
        type: string,
        required: [true, "Please provide a Password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;