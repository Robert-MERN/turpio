import Events from "../../../models/eventModel";
import connectMongo from '../../../utils/connectMongo';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        const id = req.query.eventID;
        await connectMongo()
        await Events.findByIdAndUpdate(id, req.body)
        return res.status(200).json({success: true, message: "Event has been updated"});
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}