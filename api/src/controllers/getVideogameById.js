const { Videogame, Genre } = require("../db");

const getVideogameById = async (req, res) => {
	const { id } = req.params;
	try {
		const game = await Videogame.findOne({
			where: { id },
		});
		const gameGenre = await game.getGenres();
		const gamePlatform = await game.getPlatforms();
		console.log(gameGenre);
		if (game) {
			let detailArray = [];
			detailArray.push(game);
			detailArray.push(gameGenre);
			detailArray.push(gamePlatform);
			res.status(200).json(detailArray);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = getVideogameById;
