import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
     username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

export const UserModel = mongoose.model('Users', userSchema)
