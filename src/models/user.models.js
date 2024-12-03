import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        emailVerified: {type: Boolean, required: true},
        verificationToken: {type: String, required: true},
        role: {type: String, required: true, default: 'user'}
    }
)

const User = mongoose.model('User', userSchema)

export default User