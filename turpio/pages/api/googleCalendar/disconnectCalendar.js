import { setCookie } from 'cookies-next';
import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";
import plainPayLoadMaker from '../../../utils/plainPayloadMaker';
import connectMongo from "../../../utils/connectMongo";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */



export default async function handler(req, res) {
    const { userId } = req.body;
    try {
        await connectMongo();
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json("User wasn't found");
        const items = {
            calendarAccessToken: "",
            calendarRefreshToken: "",
            calendarExpiryDate: "",
        }
        await Users.findByIdAndUpdate(userId, items);
        const updatedUser = await Users.findById(userId);
        // creating plain payload to convert user obj into token
        const plainPayLoad = plainPayLoadMaker(updatedUser);
        // converting user object in token 
        const jwtToken = await jwt.sign({ ...plainPayLoad, availability: req.body.availability }, process.env.JWT_KEY);
        // cookie expires in 30 days
        const expiryDate = new Date(new Date().setDate(new Date().getDate() + 30));
        setCookie("userAccountToken", jwtToken, { req, res, expires: expiryDate });
        res.status(200).json(plainPayLoad);
    } catch (err) {
        res.status(501).json({ success: false, message: err.message });
    }
}