import Events from "../../../models/eventModel";
import Users from "../../../models/userModel";
import connectMongo from '../../../utils/connectMongo';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo()
        // finding user by id whether he is admin or not
        const user = await Users.findById(req.query.userID);
        if (user.isAdmin) {
            const events = await Events.find();
            return res.status(200).json(events);
        }
        return res.status(401).json({ success: false, message: "You're not alllowed to do that" });
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}