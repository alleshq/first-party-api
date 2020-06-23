const db = require("../../util/db");

module.exports = async (req, res) => {
	var searchWithUsername;
	if (typeof req.query.id === "string") {
		searchWithUsername = false;
	} else if (typeof req.query.username === "string") {
		searchWithUsername = true;
	} else {
		return res.status(400).json({err: "badRequest"});
	}

	// Get User
	const user = await db.User.findOne({
		where: {
			[searchWithUsername ? "username" : "id"]: searchWithUsername
				? req.query.username
				: req.query.id
		}
	});
	if (!user) return res.status(400).json({err: "missingResource"});

	// Response
	res.json({
		id: user.id,
		username: user.username,
		name: user.name,
		nickname: user.nickname,
		reputation: user.reputation,
		rubies: user.rubies,
		private: user.private,
		about: user.about,
		plus: user.plus,
		createdAt: user.createdAt,
		primaryId: user.primaryId,
		followers: await user.countFollowers()
	});
};
