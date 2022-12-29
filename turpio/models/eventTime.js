import { connection, Schema } from "mongoose";

const EventTime = new Schema({
    title: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    description: {
        type: String
    },
    eventDuration: {
        type: Date,
        required: [true, "Please Enter Your Name"],
    },
    eventLocation: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    eventLink: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    eventColor: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    availableTime: {
        type: Object,
        required: [true, "Please Enter Your Name"],
    },
    timeZone: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    userId: {
        type: String,
        required: [true, "Please Enter Your Email"],
    },
    guest: [{
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        timeZone: {
            type: String,
        },
        meetingTime: {
            type: String
        }
    }],
},
    { timestamps: true });
const DB = connection.useDb("Turpio");
const eventTime = DB.models.EventTime || DB.model("EventType", EventTime);
export default eventTime