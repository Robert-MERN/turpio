import { setCookie } from "cookies-next";
import connect from "../../../utils/connectMongo";
import passportGoogle from "../../../utils/passportGoogle";

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function (req, res, next) {
  await connect();
  passportGoogle.authenticate("google", (err, user, token) => {
    if (err || !user) {
      return res.redirect(`${process.env.URL_APP}/login?a=auth_fail`);
    }
    // cookie expires in 30 days
    const expiryDate = new Date(new Date().setDate(new Date().getDate() + 30));
    // set cookie and send redirect
    setCookie("userAccountToken", token, {
      req,
      res,
      expires: expiryDate
    });
    return res.redirect(`${process.env.URL_APP}/home`);
  })(req, res, next);
}