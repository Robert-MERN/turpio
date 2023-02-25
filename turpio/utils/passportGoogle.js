import Users from "../models/userModel";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import defaultAvailableTimes from "./defaultAvailableTimes";
import axios from "axios";
import plainPayLoadMaker from "./plainPayloadMaker";

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.URL_APP}/api/google-auth/callback`,
        },
        async (request, accessToken, refreshToken, profile, cb) => {
            try {
                console.log(profile);
                // Make a request to the ipdata.co API to get the user's country name
                const url = `https://api.ipdata.co?api-key=${process.env.IPDATA_KEY}`;
                const response = await axios.get(url)
                const { time_zone: timeZone, country_name: country, city } = response.data;

                const obj = await Users.findOne({ email: profile.emails[0].value });
                if (!obj) {
                    // create new user
                    const newUser = await Users.create({
                        email: profile.emails[0].value,
                        username: profile.emails[0].value.split("@")[0].replace(/[^a-zA-Z0-9]+/g, '-'),
                        fullName: profile.displayName,
                        availability: [{ "Working hours": defaultAvailableTimes }],
                        calendarsLink: `https://turpio.com/schedule/${profile.emails[0].value.split("@")[0].replace(/[^a-zA-Z0-9]+/g, '-')}`,
                        googleAuth: true,
                        timeZone: timeZone.name,
                        city,
                        country,
                    });
                    const plainPayLoad = plainPayLoadMaker(newUser);
                    const token = await jwt.sign(plainPayLoad, process.env.JWT_KEY);
                    return cb(null, plainPayLoad, token);
                } else {
                    // login existing user
                    const plainPayLoad = plainPayLoadMaker(obj);
                    const token = await jwt.sign(plainPayLoad, process.env.JWT_KEY);
                    return cb(null, plainPayLoad, token);
                }
            } catch (err) {
                return cb(err, false, { message: err.message });
            }
        }
    )
);

export default passport;
