const { Videogame } = require("../db");

const getVideogames = async (req, res) => {
	try {
		const allVideogames = await Videogame.findAll();
		res.status(200).json(allVideogames);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getVideogames;
