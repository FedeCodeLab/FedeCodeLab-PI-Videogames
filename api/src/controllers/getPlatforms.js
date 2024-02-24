const { Platform } = require("../db");

const getPlatforms = async (req, res) => {
	try {
		const allPlatforms = await Platform.findAll();
		res.status(200).json(allPlatforms);
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = getPlatforms;
