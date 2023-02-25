import { connection, Schema } from "mongoose";

const Event = new Schema({
    eventName: {
        type: String
    },
    typeOfFields: {
        type: String
    },
    amountOfFields: {
        type: Number
    },

    nameOfRooms: {
        type: String
    },
    amountOfRooms: {
        type: Number
    },
    serviceName: {
        type: String
    },
    teamMembers: [],
    eventType: {
        type: String,
        required: [true, "Please Provide Event Type"],
    },
    desc: {
        type: String
    },
    eventDuration: {
        type: Number,
        required: [true, "Please Provide Your Event Duration"],
    },
    eventDurationUnit: {
        type: String,
        required: [true, "Please Provide Your Event Duration Unit"],
    },
    eventLocation: {
        type: Object,
        required: [true, "Please Provide Your Event Location"],
    },
    eventLink: {
        type: String,
        required: [true, "Please Provide Your Event Link"],
    },
    eventLinkName: {
        type: String,
        required: [true, "Please Provide Your Event Link Name"],
    },
    eventColorBG: {
        type: String,
        required: [true, "Please Provide Your Event Background Color"],
    },
    eventColorBorder: {
        type: String,
        required: [true, "Please Provide Your Event Border Color"],
    },
    availableTime: {
        type: Object,
    },
    timeZone: {
        type: String,
        required: [true, "Please Provide Your Time Zone"],
    },
    userId: {
        type: String,
        required: [true, "Please Provide Your ID"],
    },
    userEmail: {
        type: String,
        required: [true, "Please Provide Your Email"],
    },
    username: {
        type: String,
        required: [true, "Please Provide Your username"],
    },
    userFullName: {
        type: String,
        required: [true, "User full name is missing."],
    },
    guests: [],
    eventAvailable: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true });
const DB = connection.useDb("Turpio");
const Events = DB.models.Event || DB.model("Event", Event);
export default Events