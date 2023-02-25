import Events from "../../../models/eventModel";
import Users from "../../../models/userModel";
import connectMongo from '../../../utils/connectMongo';



/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {

    const currentYear = new Date()
    const lastYear = new Date(new Date().setFullYear(currentYear.getFullYear() - 1));

    try {
        await connectMongo();

        // finding user by id whether he is admin or not
        const user = await Users.findById(req.query.userID);


        if (user.isAdmin) {
            const eventStats = await Events.aggregate([
                {
                    $match: { createdAt: { $gte: lastYear } }
                },
                {
                    $project: {
                        month: { $month: "$createdAt" }
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 }
                    }
                }
            ]);
            return res.status(200).json(eventStats);
        } else {
            return res.status(401).json({ success: false, message: "You're not allowed to do that" })
        }

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }



}