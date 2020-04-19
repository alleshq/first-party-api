const db = require("../../util/db");
const config = require("../../config");

module.exports = async (req, res, next) => {
	if (typeof req.query.token !== "string")
		return res.status(400).json({err: "invalidToken"});

	//Get Token
	const token = await db.AuthToken.findOne({
		where: {
			access: req.query.token
		}
	});
	if (
		!token ||
		token.expired ||
		token.createdAt < new Date().getTime() - config.tokenLifespan
	)
		return res.status(401).json({err: "invalidToken"});
	const application = await token.getApplication();
	const user = await token.getUser();
	if (!application || !user) return res.status(401).json({err: "invalidToken"});

	res.json({
		access: token.access,
		scopes: token.scopes,
		user: token.userId,
		application: {
			id: application.id,
			name: application.name,
			firstParty: application.firstParty,
			createdAt: application.createdAt
		}
	});
};
