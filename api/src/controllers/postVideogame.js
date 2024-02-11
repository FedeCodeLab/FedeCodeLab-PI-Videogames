const { Videogame, Genre } = require("../db");

const postVideogame = async (req, res) => {
	const { name, description, plataforms, image, releaseDate, rating, genres } =
		req.body;
	console.log(req.body);
	try {
		const foundGenres = await Genre.findAll({
			where: { name: genres },
		});

		const createGame = await Videogame.create({
			name,
			description,
			plataforms,
			image,
			releaseDate,
			rating,
		});

		await createGame.addGenre(foundGenres);

		res.status(200).json(createGame);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = postVideogame;
