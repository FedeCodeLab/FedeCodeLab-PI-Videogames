const { Platform } = require("../db");
const arrayPlatforms = [
	"Playstation 1",
	"Playstation 2",
	"Playstation 3",
	"Playstation 4",
	"Playstation 5",
	"Xbox 360",
	"Xbox One",
	"Nintendo Switch",
	"PC",
	"PSP",
	"Nintendo 3DS",
];

const getAllPlatforms = async (req, res) => {
	try {
		for (const platformName of arrayPlatforms) {
			const newPlatform = new Platform({ name: platformName });
			await newPlatform.save();
			console.log(newPlatform);
		}
		res.status(200).json({ message: "Platforms inserted successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getAllPlatforms;
