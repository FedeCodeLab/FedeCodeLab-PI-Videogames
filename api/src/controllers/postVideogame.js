const { Videogame, Genre, Platform } = require("../db");

const postVideogame = async (req, res) => {
	const {
		name,
		description,
		background_image,
		background_image_additional,
		release_date,
		rating,
		genres,
		platforms,
	} = req.body;
	console.log(req.body);
	try {
		const foundgenres = await Genre.findAll({
			where: { name: genres },
		});

		const foundplatforms = await Platform.findAll({
			where: { name: platforms },
		});

		const createGame = await Videogame.create({
			name,
			description,
			background_image,
			background_image_additional,
			release_date,
			rating,
		});

		await createGame.addGenre(foundgenres);
		await createGame.addPlatform(foundplatforms);

		res.status(200).json(createGame);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = postVideogame;
