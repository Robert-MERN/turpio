import { setCookie } from 'cookies-next';
import { oauth2Client } from '.';
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
    const { code, state } = req.query;
    try {
        await connectMongo();
        const { tokens } = await oauth2Client.getToken(code);
        const id = state;
        const user = await Users.findById(id);
        if (!user) return res.status(404).json("User wasn't found");
        const items = {
            calendarAccessToken: tokens.access_token,
            calendarRefreshToken: tokens.refresh_token,
            calendarExpiryDate: tokens.expiry_date,
        }
        await Users.findByIdAndUpdate(id, items);
        const updatedUser = await Users.findById(id);
        // creating plain payload to convert user obj into token
        const plainPayLoad = plainPayLoadMaker(updatedUser);
        // converting user object in token 
        const jwtToken = await jwt.sign({ ...plainPayLoad, availability: req.body.availability }, process.env.JWT_KEY);
        // cookie expires in 30 days
        const expiryDate = new Date(new Date().setDate(new Date().getDate() + 30));
        setCookie("userAccountToken", jwtToken, { req, res, expires: expiryDate });
        res.redirect('/home');
    } catch (err) {
        res.redirect('/home/availability');
    }
}