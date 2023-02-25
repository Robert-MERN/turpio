import Users from '../../models/userModel';
import connectMongo from '../../utils/connectMongo';

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    const { username } = req.query
    try {
        await connectMongo()
        // finding user by id whether he is admin or not
        const user = await Users.findOne({ username });
        if (user) {
            const { fullName, welcomeMessage } = user;
            return res.status(200).json({ fullName, welcomeMessage });
        }
        return res.status(401).json({ success: false, message: "No user found with this username." });
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}