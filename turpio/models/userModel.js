import { Schema, connection } from "mongoose"

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    googleAuth: {
        type: Boolean,
        default: false
    },
    username: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: String
    },
    welcomeMessage: {
        type: String,
        default: "Welcome to my scheduling page. Please follow the instructions to add an event to my calendar."
    },
    language: {
        type: String,
        default: "english"
    },
    subscription: {
        type: Object,
        default: {
            status: "trial",
            date: new Date(),
        }
    },
    calendarsLink: {
        type: String,
    },
    calendarAccessToken: {
        type: String,
        default: "",
    },
    calendarRefreshToken: {
        type: String,
        default: "",
    },
    calendarExpiryDate: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        required: [true, "Please Provide Your country"],
    },
    timeZone: {
        type: String,
        required: [true, "Please Provide Your Time Zone"],
    },
    availability: {
        type: Array,
        required: [true, "Please Provide Your availability"],
    }
}, { timestamps: true });


const Db = connection.useDb("Turpio")
const Users = Db.models.Users || Db.model('Users', userSchema);
export default Users