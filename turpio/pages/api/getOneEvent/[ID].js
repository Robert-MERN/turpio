import Events from "../../../models/eventModel";
import connectMongo from '../../../utils/connectMongo';
import mongoose from 'mongoose';
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        const { ID, username } = req.query;
        await connectMongo();
        let event;
        if (mongoose.Types.ObjectId.isValid(ID)) {
            event = await Events.findById(ID);
        } else {
            event = await Events.findOne({ $and: [{ eventLinkName: ID }, { username }] });
        }
        if (!event) return res.status(404).json({ success: false, message: "Event Not Found" })
        return res.status(200).json(event);
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}