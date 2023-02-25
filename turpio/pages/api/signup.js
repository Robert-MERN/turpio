import Users from '../../models/userModel';
import connectMongo from '../../utils/connectMongo';
import { deleteCookie, setCookie } from 'cookies-next';
import jwt from "jsonwebtoken";
import cryptojs from "crypto-js";
import moment from 'moment-timezone';
import defaultAvailableTimes from '../../utils/defaultAvailableTimes';
import axios from 'axios';
import plainPayLoadMaker from '../../utils/plainPayloadMaker';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function registerUser(req, res) {
    console.log("Connecting with DB")
    try {

        // connecting with monogDB
        await connectMongo();
        console.log("Successfuly conneted with DB");

        // collecting information from request body
        const { password, email, ...other } = req.body;

        // encrypting password
        const encrypted = cryptojs.AES.encrypt(password, process.env.CJS_KEY).toString();

        // creating username with email
        const username = email.split("@")[0].replace(/[^a-zA-Z0-9]+/g, '-');
        const calendarsLink = `https://turpio.com/schedule/${username}`;
        const availability = [{ "Working hours": defaultAvailableTimes }]
        // Make a request to the ipdata.co API to get the user's country name
        const url = `https://api.ipdata.co?api-key=${process.env.IPDATA_KEY}`;
        const response = await axios.get(url)
        const { time_zone: timeZone, country_name: country, city } = response.data;

        // saving user in DB
        const user = new Users({
            ...other,
            email,
            password: encrypted,
            timeZone: timeZone.name,
            username,
            calendarsLink,
            availability,
            country,
            city
        });
        await user.save();

        if (!req.body.adminAddingUser) {
            // creating plain payload to convert user obj into token
            const plainPayLoad = plainPayLoadMaker(user);

            // converting user object in token 
            const token = await jwt.sign(plainPayLoad, process.env.JWT_KEY);

            // cookie expires in 30 days
            const expiryDate = new Date(new Date().setDate(new Date().getDate() + 30));

            // now setting that token in cookies
            setCookie("userAccountToken", token, { req, res, expires: expiryDate });

            // sending success response to user
            res.status(200).json({ success: true, message: "User has been signed up!" });

        } else {
            // sending success response to admin
            res.status(200).json({ success: true, message: "User has been created." });
        }

    } catch (err) {

        // if server catches any error
        deleteCookie("signupUser")
        res.status(500).json({ success: false, message: err.message, error: err });
    }

}