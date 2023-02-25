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
      to: guestInfo.guestEmail,
      subject: `Invitation: ${eventDB.userFullName}`,
      html: `
      <p style="font-size: 16px;">Event Name: ${getTitle(eventDB)}</P>
      <p style="font-size: 16px;">${eventDB.desc ? eventDB.desc : ""}</P>

      <div>
        <p style="font-size: 16px;" >
        Need to make changes to this event?
        <br/>
        Cancel: <a href="https://turpio.com/schedule/${eventDB.username}/cancellations/${eventDB._id}" target="__blank" >https://turpio.com/schedule/${eventDB.username}/cancellations/${eventDB._id}</a>
        <br/>
        Reschedule: <a href="https://turpio.com/schedule/${eventDB.username}/reschedulings/${eventDB._id}" target="__blank" >https://turpio.com/schedule/${eventDB.username}/reschedulings/${eventDB._id}</a>
        </p>
      </div>

      <p style="font-size: 16px;">Powered by turpio.com</P><br/>


      <p style="font-size: 16px; font-weight: 700; text-transform: capitalize;">When</P>
      <p style="font-size: 16px;">
      ${eventDB.eventType === "hotel-reservation" ?
          `${guestInfo.date[0].startWeekday}, ${guestInfo.date[0].startMonth} ${guestInfo.date[0].startDay}, ${guestInfo.date[0].startYear}  - ${guestInfo.date[1].endWeekday}, ${guestInfo.date[1].endMonth} ${guestInfo.date[1].endDay}, ${guestInfo.date[1].endYear}`
          :
          `${guestInfo.startTime} - ${guestInfo.endTime}, ${guestInfo.day}, ${guestInfo.month} ${guestInfo.dayNumeric}, ${guestInfo.year}`}

      </P><br/>


      <p style="font-size: 16px; font-weight: 700; text-transform: capitalize;">Location</P>
      <p style="font-size: 16px;">
      ${eventDB.eventLocation.location === "Zoom" ?
          'Web conference(Zoom)'
          :
          eventDB.eventLocation.location === "Google Meet" ?
            'Web conference(Google Meet)'
            : eventDB.eventLocation.location === "Custom" ?
              `${eventDB.eventLocation.customLocation}`
              :
              `${eventDB.eventLocation.location} `
        }
      </P><br/>


      <p style="font-size: 16px; font-weight: 700; text-transform: capitalize;">Guests</P>
      <p style="font-size: 16px;">
        ${eventDB.userEmail} - <span style="color: gray;" >organizer</span>
        </br>
        <p style="font-size: 16px;">
        ${guestInfo.guestEmail}
        </p>
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
