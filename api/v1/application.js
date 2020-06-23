const db = require("../../util/db");

module.exports = async (req, res) => {
	// Get Credentials
	var applicationCredentials;
	if (typeof req.query.credentials === "string") {
		var credentialsString;
		if (
			req.query.credentials.split(" ").length !== 2 ||
			!req.query.credentials.startsWith("Basic ")
		)
			return res.status(401).json({err: "missingResource"});
		try {
			credentialsString = Buffer.from(
				req.query.credentials.split(" ")[1],
				"base64"
			)
				.toString()
				.split(":");
		} catch (err) {
			return res.status(400).json({err: "missingResource"});
		}
		if (credentialsString.length !== 2)
			return res.status(400).json({err: "missingResource"});

		applicationCredentials = {
			id: credentialsString[0],
			secret: credentialsString[1]
		};
	} else if (typeof req.query.id === "string") {
		applicationCredentials = {
			id: req.query.id,
			secret: typeof req.query.secret === "string" ? req.query.secret : null
		};
	} else return res.status(400).json({err: "badRequest"});

	//Get Application
	const application = await db.Application.findOne({
		where: {
			id: applicationCredentials.id
		}
	});
	if (!application) return res.status(400).json({err: "missingResource"});
	if (
		applicationCredentials.secret &&
		application.secret !== applicationCredentials.secret
	)
		return res.status(400).json({err: "missingResource"});

	res.json({
		id: application.id,
		secret: application.secret,
		name: application.name,
		description: application.description,
		callbackUrls: application.callbackUrls,
		firstParty: application.firstParty,
		createdAt: application.createdAt
	});
};
