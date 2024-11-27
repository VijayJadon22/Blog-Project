const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified("password") || this.isNew) {
            const saltRounds = 12;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
        next();      
    } catch (error) {
        next(error); // Passes the error to the next middleware
    }
})

const User = mongoose.model("user", userSchema);


module.exports = User;