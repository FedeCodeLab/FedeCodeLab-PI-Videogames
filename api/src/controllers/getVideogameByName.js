const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");
const { Op } = require("sequelize");

const getVideogameByName = async (req, res) => {
	const { name } = req.query;
	try {
		const dbVideogames = await Videogame.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: [Genre, Platform],
		});

		const pageSize = 40;
		const totalPages = Math.ceil(100 / pageSize);
		const apiGames = [];

		for (let page = 1; page <= totalPages; page++) {
			const response = await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`
			);

			const filteredGames = response.data.results.filter(
				(game) =>
					!dbVideogames.some((dbGame) =>
						dbGame.name.toLowerCase().startsWith(game.name.toLowerCase())
					)
			);

			const filteredGamesByName = filteredGames.filter((game) =>
				game.name.toLowerCase().startsWith(name.toLowerCase())
			);

			apiGames.push(...filteredGamesByName);
		}

		const slicedGames = apiGames.slice(0, 100);
		const allGames = [...dbVideogames, ...slicedGames];

		if (allGames.length > 0) {
			res.status(200).json(allGames);
		} else {
			res.status(404).json({ message: "No se encontraron juegos" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = getVideogameByName;
