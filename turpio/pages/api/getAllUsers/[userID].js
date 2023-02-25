import Users from '../../../models/userModel';
import connectMongo from '../../../utils/connectMongo';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo()
        const { userID } = req.query;
        // finding user by id whether he is admin or not
        const user = await Users.findById(userID);
        if (user.isAdmin) {
            const users = await Users.find().sort({ createdAt: -1 });
            const filteredUsers = users.filter(each => !each._id.equals(user._id));
            return res.status(200).json(filteredUsers);
        }
        return res.status(401).json({ success: false, message: "You're not alllowed to do that" });
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}