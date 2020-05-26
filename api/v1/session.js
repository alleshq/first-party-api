const db = require("../../util/db");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
	//Parse Header
	const authToken = req.query.token;
	if (typeof authToken !== "string")
		return res.status(400).json({err: "invalidSession"});
	var token;
	try {
		token = jwt.verify(authToken, process.env.JWT_SECRET);
	} catch (err) {
		return res.status(400).json({err: "invalidSession"});
	}

	//Get Session
	const session = await db.Session.findOne({
		where: {
			id: token.session
		}
	});
	if (!session) return res.status(400).json({err: "invalidSession"});

	//Response
	res.json({
		session: session.id,
		user: session.userId
	});
};
