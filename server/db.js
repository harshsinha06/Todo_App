import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String
});

const OTP = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 500 } }
})

const Todo = new Schema({
    title: String,
    description: String,
    done: Boolean,
    userID: ObjectId,
    priority: {
        type: Number,
        enum: [1, 2, 3], // Only these values allowed
        default: 2
    }
});

export const UserModel = model('users', User);
export const TodoModel = model('todos', Todo);
export const OtpModel = model('otps', OTP);

