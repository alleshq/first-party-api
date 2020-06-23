const db = require("../../util/db");

module.exports = async (req, res) => {
	if (typeof req.query.id !== "string" || typeof req.body.plus !== "boolean")
		return res.status(400).json({err: "badRequest"});

	// Get User
	const user = await db.User.findOne({
		where: {
			id: req.query.id
		}
	});
	if (!user) return res.status(400).json({err: "missingResource"});

	// Update
	await user.update({
		plus: req.body.plus
	});

	// Response
	res.json({});
};
