const db = require("../../util/db");

module.exports = async (req, res) => {
	if (typeof req.query.id !== "string")
		return res.status(400).json({err: "badRequest"});

	// Get User
	const user = await db.User.findOne({
		where: {
			id: req.query.id
		}
	});
	if (!user) return res.status(400).json({err: "missingResource"});

	// Get Primary Account
	const primary = await user.getPrimary({
		attributes: ["id", "username", "name", "plus"]
	});

	// Get Secondary Accounts
	const secondaries = await (primary ? primary : user).getSecondaries({
		attributes: ["id", "username", "name", "plus"]
	});

	// Response
	res.json({
		primary: primary
			? primary
			: {
					id: user.id,
					username: user.username,
					name: user.name,
					plus: user.plus
			  },
		secondaries
	});
};
