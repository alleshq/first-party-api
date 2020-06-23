const db = require("../../util/db");

module.exports = async (req, res) => {
	if (typeof req.query.id !== "string")
		return res.status(400).json({err: "badRequest"});

	// Get User
	const user = await db.User.findOne({
		where: {
			stripeCustomerId: req.query.id
		}
	});
	if (!user) return res.status(400).json({err: "missingResource"});

	// Response
	res.json({
		id: user.id
	});
};
