const db = require("../../util/db");
const uuid = require("uuid").v4;

module.exports = async (req, res) => {
	if (typeof req.query.id !== "string" || typeof req.body.content !== "string")
		return res.status(400).json({err: "badRequest"});

	// Get User
	const user = await db.User.findOne({
		where: {
			id: req.query.id
		}
	});
	if (!user) return res.status(400).json({err: "missingResource"});

	// Create Post
	const post = await db.Post.create({
		id: uuid(),
		content: req.body.content,
		score: 0
	});
	await post.setUser(user);

	// Response
	res.json({
		id: post.id
	});
};
