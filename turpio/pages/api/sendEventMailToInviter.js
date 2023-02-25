import nodemailer from "nodemailer";
import { getTitle } from "../../utils/eventSortFunctions";

const handler = async (req, res) => {
  try {
    const { eventDB, guestInfo } = req.body;
    let transport = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: { rejectUnauthorized: false }
    });
    const mailOptions = {
      from: `Turpio <info@turpio.com>`,
      to: eventDB.userEmail,
      subject: `New Event: ${guestInfo.guestName} - ${getTitle(eventDB)}`,
      html: `
      <p style="font-size: 16px;">Hi ${guestInfo.guestName},</P>
      <p style="font-size: 16px;">A new event has been scheduled.</P>

      <p style="font-size: 16px;" >
        <span style="font-size: 14px; font-weight: 700; text-transform: capitalize;">Event Type:</span>
        </br>
        ${getTitle(eventDB)}
      </p>


      <p style="font-size: 16px;" >
        <span style="font-size: 14px; font-weight: 700; text-transform: capitalize;">Invitee:</span>
        </br>
        ${guestInfo.guestName}
      </p>

         

      <p style="font-size: 16px;" >
        <span style="font-size: 14px; font-weight: 700; text-transform: capitalize;">Invitee Email:</span>
        </br>
        <a href="mailto:${guestInfo.guestEmail}" style="font-size: 16px;">${guestInfo.guestEmail}</a>
      </p>

         

      <p style="font-size: 16px;" >
        <span style="font-size: 14px; font-weight: 700; text-transform: capitalize;">Event Date/Time:</span>
        </br>
    
        ${eventDB.eventType === "hotel-reservation" ?
          `${guestInfo.date[0].startWeekday}, ${guestInfo.date[0].startMonth} ${guestInfo.date[0].startDay}, ${guestInfo.date[0].startYear}  - ${guestInfo.date[1].endWeekday}, ${guestInfo.date[1].endMonth} ${guestInfo.date[1].endDay}, ${guestInfo.date[1].endYear}`
          :
          `${guestInfo.startTime} - ${guestInfo.endTime}, ${guestInfo.day}, ${guestInfo.month} ${guestInfo.dayNumeric}, ${guestInfo.year}`}
       
      </p>



      <p style="font-size: 16px;" >
        <span style="font-size: 14px; font-weight: 700; text-transform: capitalize;">Location:</span>
        </br>
        </br>
      
        ${eventDB.eventLocation.location === "Zoom" || eventDB.eventLocation.location === "Google Meet" ?
          'Web conferencing details provided upon confirmation.'
          : eventDB.eventLocation.location === "Custom" ?
            `${eventDB.eventLocation.customLocation}`
            :
            `${eventDB.eventLocation.location} `
        }
        
      </p>



      <p style="font-size: 16px;" >
        <span style="font-size: 14px; font-weight: 700; text-transform: capitalize;">Invitee Time Zone:</span>
        </br>
       ${guestInfo.timeZone}
      </p>

      `
    };

    await transport.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Event is booked" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

export default handler
