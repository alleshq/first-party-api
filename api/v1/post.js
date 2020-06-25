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

	// Get Content Score
	let score = 0;
	try {
		score = (
			await axios.post(
				"https://content-score.alles.cx",
				{
					content
				},
				{
					headers: {
						authorization: process.env.CONTENT_SCORE
					}
				}
			)
		).data;
	} catch (err) {}

	// Update user reputation
	await user.update({
		reputation: literal(`reputation + ${score}`)
	});

	// Create Post
	const post = await db.Post.create({
		id: uuid(),
		content: req.body.content,
		score: 0
	});
	await post.setUser(user);

	// Upvote
	await db.PostInteraction.create({
		postId: post.id,
		userId: user.id,
		vote: "up"
	});

	// Response
	res.json({
		id: post.id
	});
};
