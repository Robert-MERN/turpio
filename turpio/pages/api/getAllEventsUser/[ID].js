import Events from "../../../models/eventModel";
import connectMongo from '../../../utils/connectMongo';


/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        const { ID } = req.query;

        await connectMongo();

        const events = await Events.find({ $or: [{ userId: ID }, { username: ID }] }).sort({ createdAt: -1 });

        if (events.length > 0) {
            return res.status(200).json(events);
        }
        return res.status(200).json({ success: false, message: "No events found" });

    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}