const { Videogame, Genre } = require("../db");

const postVideogame = async (req, res) => {
	const {
		name,
		description,
		platforms,
		background_image,
		releaseDate,
		rating,
		genres,
	} = req.body;
	console.log(req.body);
	try {
		const foundgenres = await Genre.findAll({
			where: { name: genres },
		});

		const createGame = await Videogame.create({
			name,
			description,
			platforms,
			background_image,
			releaseDate,
			rating,
		});

		await createGame.addGenre(foundgenres);

		res.status(200).json(createGame);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = postVideogame;
