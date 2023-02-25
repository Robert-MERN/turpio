import Users from '../../../models/userModel';
import Events from "../../../models/eventModel";
import connectMongo from '../../../utils/connectMongo';


/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo()

        // this is the id of the person who's calling this API
        const id = req.query.userID

        // now finding that person with whether he is an admin or not
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "No user exists with this ID" });
        }

        // this is the targeted id 
        const { targetID } = req.body;

        // checking whether 'user or admin' making this request or 'unknown user' 
        if (targetID === id || user.isAdmin) {
            const events = await Events.find({ userId: targetID });
            if (events.length) {
                await Promise.all(
                    events.map(each => {
                        return Events.findByIdAndDelete(each._id)
                    })
                )
            }
            await Users.findByIdAndDelete(targetID);
            return res.status(200).json({ success: true, message: "Account has been deleted!" });
        }

        // if he is an unknown user
        return res.status(401).json({ success: false, message: "You're not allowed to that" });
    } catch (err) {
        return res.status(501).json({ success: false, message: err.message });
    }
}