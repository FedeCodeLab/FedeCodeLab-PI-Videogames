const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");

const getVideogameByName = async (req, res) => {
	const { name } = req.query;
	try {
		const videoGames = await Videogame.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: Genre,
		});

		if (videoGames.length > 0) {
			res.status(200).json(videoGames);
		} else {
			res
				.status(404)
				.json({ message: "No videogames found with the specified name." });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = getVideogameByName;
