import connect from "../../../utils/connectMongo";
import passportGoogle from "../../../utils/passportGoogle";

export default async function (req, res, next) {
    await connect();
    passportGoogle.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })(req, res, next);
}