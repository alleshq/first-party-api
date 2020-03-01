const db = require("../../util/db");
const credentials = require("../../credentials");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    //Parse Header
    const authToken = req.query.session;
    if (typeof authToken !== "string") return res.status(400).json({err: "invalidSession"});
    var token;
    try {
        token = jwt.verify(authToken, credentials.jwtSecret);
    } catch (err) {
        return res.status(400).json({err: "invalidSession"});
    }

    //Get Session
    const session = await db.Session.findOne({
        where: {
            id: token.session
        },
        include: ["user"]
    });
    if (!session) return res.status(400).json({err: "invalidSession"});

    //Response
    res.json({
        session: session.id,
        user: session.user.id
    });

};