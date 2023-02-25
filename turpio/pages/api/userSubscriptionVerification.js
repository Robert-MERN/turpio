import Users from '../../models/userModel';
import connectMongo from '../../utils/connectMongo';
import jwt from "jsonwebtoken";
import { setCookie } from 'cookies-next';
import plainPayLoadMaker from '../../utils/plainPayloadMaker';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

const changeSubStatus = async (id, status, req, res) => {
    // updating user in db.
    await Users.findByIdAndUpdate(id, { subscription: { status, date: new Date() } });
    const updatedUser = await Users.findById(id);
    // creating plain payload to convert user obj into token
    const plainPayLoad = plainPayLoadMaker(updatedUser);
    // converting user object in token 
    const token = await jwt.sign(plainPayLoad, process.env.JWT_KEY);
    // cookie expires in 30 days
    const expiryDate = new Date(new Date().setDate(new Date().getDate() + 30));

    // now setting that token in cookies
    setCookie("userAccountToken", token, { req, res, expires: expiryDate });
    return res.status(200).json({ success: true, message: status, updatedUser });
}

const daysDifference = (date) => {
    // checking months
    const subscriptionDate = new Date(date);
    // Calculate the number of milliseconds between the starting date and today's date
    const millisecondsBetween = new Date().getTime() - subscriptionDate.getTime();
    // Convert the milliseconds to days
    return Math.floor(millisecondsBetween / (1000 * 60 * 60 * 24));
}

export default async function registerUser(req, res) {
    console.log("Connecting with DB")
    try {
        const { id } = req.body;
        // connecting with monogDB
        await connectMongo();
        console.log("Successfuly conneted with DB");

        // finding user
        const user = await Users.findById(id);

        // if user is not found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" })
        }

        // days difference
        const daysBetween = daysDifference(user.subscription.date);

        switch (user.subscription.status) {
            case "trial":
                if (daysBetween < 32) {
                    return res.status(200).json({ success: true, message: "trial" });
                } else {
                    changeSubStatus(id, "no subscription", req, res);
                }
                break;
            case "monthly":
                if (daysBetween < 32) {
                    return res.status(200).json({ success: true, message: "subscribed" });
                } else {
                    changeSubStatus(id, "no subscription", req, res);
                }
                break;
            case "yearly":
                if (daysBetween <= 366) {
                    return res.status(200).json({ success: true, message: "subscribed" });
                } else {
                    changeSubStatus(id, "expired", req, res);
                }
                break;
            case "expired":
                res.status(200).json({ success: true, message: "expired" });
                break;
            case "no subscription":
                res.status(200).json({ success: true, message: "no subscription" });
                break;
            default:
                // if someone tried to hack that subscription stuff will be caught here.
                res.status(200).json({ success: true, message: "no subscription" });
                break;
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    };
};