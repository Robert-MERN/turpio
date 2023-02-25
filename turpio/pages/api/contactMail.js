import nodemailer from "nodemailer";
import cryptojs from "crypto-js";
import Users from "../../models/userModel";

const handler = async (req, res) => {
  try {
    // decrypting code
    const bytes = cryptojs.AES.decrypt(req.body.code, process.env.CJS_KEY);
    const decryptedCode = bytes.toString(cryptojs.enc.Utf8);
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
      to: req.body.email,
      subject: "Thank you for contacting us",
      html: `
      <h1 style="color: black;" >Turpio</h1>
      <p style="font-size: 16px; font-weight: 600; text-transform: capitalize;">Verification code:</P><br/>
      <p style="font-size: 20px; font-weight: 600; text-transform: capitalize;" ><span style="color: black;" >${decryptedCode}</span></p>
      `
    };

    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      await transport.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: "Code has been sent to your mail!" });
    } else {
      return res.status(406).json({ success: false, message: "The user with the same email already existing!" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Code didn't send due to server error" })
  }
}

export default handler
