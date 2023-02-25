import Events from "../../models/eventModel";
import connectMongo from '../../utils/connectMongo';


/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req, res) {
    try {
        await connectMongo()
        const { desc, eventLink, ...rest } = req.body;
        const eventLinkName = eventLink.split("/")[3]
        let event;
        if (desc) {
            event = new Events({ ...rest, desc: desc.split("/")[0], eventLinkName, eventLink });
        } else {
            event = new Events({ ...rest, eventLinkName, eventLink });
        }
        await event.save();
        return res.status(200).json({ success: true, message: "Event has been added" });
    } catch (err) {
        console.log(err.message)
        return res.status(501).json({ success: false, message: err.message });
    }

}