// pages/api/calendar.js
import { google } from 'googleapis';
import Users from '../../../models/userModel';
import connectMongo from "../../../utils/connectMongo";

export default async function handler(req, res) {
    const { eventId, start, end, summary, userId } = req.body;
    try {
        await connectMongo();
        const user = await Users.findById(userId);

        if (!user) {
            return res.status(401).json({ message: 'User not authorized to access Google Calendar' });
        }
        if (!user.calendarAccessToken) {
            return res.status(401).json({ message: "You're not connected with google Calendar" });
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID_CALENDAR,
            process.env.GOOGLE_CLIENT_SECRET_CALENDAR,
            process.env.URL_APP + process.env.GOOGLE_REDIRECT_URI_CALENDAR
        );

        oauth2Client.setCredentials({
            access_token: user.calendarAccessToken,
            refresh_token: user.calendarRefreshToken,
            expiry_date: user.calendarExpiryDate,
        });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const eventsExist = await calendar.events.get({
            calendarId: 'primary',
            eventId,
        })
        if (eventsExist) {
            await calendar.events.update({
                calendarId: 'primary',
                eventId,
                resource: {
                    eventId,
                    summary,
                    start: { dateTime: start, timeZone: user.timezone },
                    end: { dateTime: end, timeZone: user.timezone },
                },
            });

        } else {
            await calendar.events.insert({
                calendarId: 'primary',
                resource: {
                    eventId,
                    summary,
                    start: { dateTime: start, timeZone: user.timezone },
                    end: { dateTime: end, timeZone: user.timezone },
                },
            });
        }


        res.status(201).json({ message: 'Event created in Google Calendar' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};