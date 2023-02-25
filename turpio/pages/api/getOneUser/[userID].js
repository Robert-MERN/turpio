import Users from '../../../models/userModel';
import connectMongo from '../../../utils/connectMongo';
import plainPayLoadMaker from '../../../utils/plainPayloadMaker';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo()
        const { userID } = req.query;
        const { id } = req.body;
        if (userID === id) {
            return res.status(401).json({ success: false, message: "You can't update your account from here." });
        }
        // finding user by id whether he is admin or not
        const user = await Users.findById(userID);
        if (user.isAdmin) {
            const user = await Users.findById(id);
            if (!user) {
                return res.status(404).json({ success: false, message: "User wasn't found with this ID." });
            }
            const plainPayload = plainPayLoadMaker(user);
            return res.status(200).json(plainPayload);
        };
        return res.status(401).json({ success: false, message: "You're not alllowed to do that" });
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}