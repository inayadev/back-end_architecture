import mongoose from "mongoose"
import { userdata } from "../interface/UserInterface"
import isEmail from "validator/lib/isEmail"


interface iuserData extends userdata, mongoose.Document{}

const UserShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        email: {
            type: String,
            required: [true, "please enter your email"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [isEmail, "please enter a valid email"]
        },

        password: {
            type: String,
            required: [true, "please enter a password"],
            minlength: 6,
        }
    },

    {timestamps:true, versionKey: false}
)


const usermModel = mongoose.model<iuserData>("User", UserShema)

export default usermModel






