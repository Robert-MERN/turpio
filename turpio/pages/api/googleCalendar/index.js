import { google } from 'googleapis';



/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID_CALENDAR,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_CALENDAR,
    redirectUri: process.env.URL_APP + process.env.GOOGLE_REDIRECT_URI_CALENDAR,
});

const scopes = [
    'https://www.googleapis.com/auth/calendar.events',
];


export default async function handler(req, res) {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: req.body.userId,
    });

    res.status(200).json({ authUrl });
}