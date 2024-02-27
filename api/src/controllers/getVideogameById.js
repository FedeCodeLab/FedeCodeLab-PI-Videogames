require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db");

const getVideogameById = async (req, res) => {
	const { id } = req.params;

	try {
		if (isNaN(id)) {
			const game = await Videogame.findOne({
				where: { id },
				include: [Genre, Platform],
			});
			res.status(200).json(game);
		} else {
			const data = (
				await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
			).data;
			const gameId = {
				id: data.id,
				name: data.name,
				description: data.description,
				platforms: data.platforms.map((platform) => platform.platform.name),
				background_image: data.background_image,
				background_image_additional: data.background_image_additional,
				release_date: data.released,
				rating: data.rating,

				genres: data.genres.map((genre) => {
					return {
						id: genre.id,
						name: genre.name,
					};
				}),
			};

			if (gameId) {
				res.status(200).json(gameId);
			} else {
				res
					.status(404)
					.json({ message: "No se encontró ningún juego con ese id." });
			}
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = getVideogameById;
