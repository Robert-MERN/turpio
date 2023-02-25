import Users from "../../../models/userModel";
import connectMongo from '../../../utils/connectMongo';
import Events from "../../../models/eventModel";



/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo();
        // finding user by id whether he is admin or not
        const user = await Users.findById(req.query.userID);
        if (user.isAdmin) {
            const totalUsers = await Users.find();
            const totalEvents = await Events.find();
            const monthlySub = totalUsers.filter(e => e.subscription.status === "monthly");
            const yearlySub = totalUsers.filter(e => e.subscription.status === "yearly");
            const trialPeriod = totalUsers.filter(e => e.subscription.status === "trial");
            const expiredSub = totalUsers.filter(e => e.subscription.status === "expired" || e.subscription.status === "no subscription");
            return res.status(200).json([
                totalUsers.length,
                totalEvents.length,
                monthlySub.length,
                yearlySub.length,
                trialPeriod.length,
                expiredSub.length
            ]);
        } else {
            return res.status(401).json({ success: false, message: "You're not allowed to do that" })
        }

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }



}