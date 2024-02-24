const { Videogame, Genre, Platform } = require("../db");

const getDbVideogames = async (req, res) => {
	try {
		const allVideogames = await Videogame.findAll({
			include: [{ model: Genre }, { model: Platform }],
		});
		res.status(200).json(allVideogames);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getDbVideogames;
