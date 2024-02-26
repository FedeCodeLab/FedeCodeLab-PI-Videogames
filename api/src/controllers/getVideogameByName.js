const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");
const { Op } = require("sequelize");

const getVideogameByName = async (req, res) => {
	const { name } = req.query;
	try {
		// Obtener los videojuegos de la base de datos que coinciden con el nombre
		const dbVideogames = await Videogame.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
			include: [Genre, Platform],
		});

		// Realizar la solicitud a la API Rawg para obtener los videojuegos
		const pageSize = 40;
		const totalPages = Math.ceil(100 / pageSize);
		const apiGames = [];

		for (let page = 1; page <= totalPages; page++) {
			const response = await axios.get(
				`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}`
			);

			// Filtrar los juegos de la API que ya están en la base de datos y que no tienen el mismo nombre
			const filteredGames = response.data.results.filter(
				(game) =>
					!dbVideogames.some(
						(dbGame) => dbGame.name.toLowerCase() === game.name.toLowerCase()
					)
			);

			// Filtrar los juegos de la API por nombre
			const filteredGamesByName = filteredGames.filter((game) =>
				game.name.toLowerCase().includes(name.toLowerCase())
			);

			// Agregar los juegos filtrados a apiGames
			apiGames.push(...filteredGamesByName);
		}

		// Obtener los primeros 100 juegos
		const slicedGames = apiGames.slice(0, 100);

		// Combinar los juegos de la base de datos y los juegos de la API
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

// const https = require("https");
// const { Op } = require("sequelize");
// const { Videogame, Genre, Platform } = require("../db");
// require("dotenv").config();
// const { API_KEY } = process.env;

// const getVideogameByName = async (req, res) => {
// 	const { name } = req.query;
// 	try {
// 		const dbVideogames = await Videogame.findAll({
// 			where: {
// 				name: {
// 					[Op.iLike]: `%${name}%`,
// 				},
// 			},
// 			include: [Genre, Platform],
// 		});

// 		const options = {
// 			hostname: "api.rawg.io",
// 			path: `/api/games?search=${name}&key=${API_KEY}&pageSize=15`,
// 			method: "GET",
// 		};

// 		const request = https.request(options, (response) => {
// 			let data = "";
// 			response.on("data", (chunk) => {
// 				data += chunk;
// 			});

// 			response.on("end", () => {
// 				try {
// 					const apiVideogamesRaw = JSON.parse(data).results;

// 					// Aplicar filtro por plataforma Xbox
// 					const filteredApi = apiVideogamesRaw.filter((game) =>
// 						game.platforms.some((platform) => platform.platform.name === "Xbox")
// 					);

// 					const combinedResult = [...dbVideogames, ...filteredApi];
// 					const result = combinedResult.slice(0, 15);

// 					if (result.length > 0) {
// 						res.status(200).json(result);
// 					} else {
// 						res.status(404).json({
// 							message: `No se encontró ningún videojuego que coincida con: '${name}'.`,
// 						});
// 					}
// 				} catch (error) {
// 					res.status(500).json({ error: error.message });
// 				}
// 			});
// 		});

// 		request.on("error", (error) => {
// 			res.status(500).json({ error: error.message });
// 		});

// 		request.end();
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// ? -------------------------------------------------------------

// module.exports = getVideogameByName;

// const https = require("https");
// const { Op } = require("sequelize");
// const { Videogame, Genre, Platform } = require("../db");
// require("dotenv").config();

// const { API_KEY } = process.env;

// const getVideogameByName = async (req, res) => {
// 	const { name } = req.query;
// 	try {
// 		const dbVideogames = await Videogame.findAll({
// 			where: {
// 				name: {
// 					[Op.iLike]: `%${name}%`,
// 				},
// 			},
// 			include: [Genre, Platform],
// 		});

// 		const options = {
// 			hostname: "api.rawg.io", // Aquí corregido
// 			path: `/api/games?search=${name}&key=${API_KEY}&pageSize=15`, // Aquí también corregido
// 			method: "GET",
// 		};

// 		const request = https.request(options, (response) => {
// 			let data = "";
// 			response.on("data", (chunk) => {
// 				data += chunk;
// 			});

// 			response.on("end", () => {
// 				try {
// 					const apiVideogamesRaw = JSON.parse(data).results;

// 					const filteredApi = apiVideogamesRaw.filter((game) =>
// 						game.name.toLowerCase().includes(name.toLowerCase())
// 					);

// 					const combinedResult = [...dbVideogames, ...filteredApi];
// 					const result = combinedResult.slice(0, 15);

// 					if (result.length > 0) {
// 						res.status(200).json(result);
// 					} else {
// 						res.status(404).json({
// 							message: `No se encontró ningún videojuego que coincida con: '${name}'.`,
// 						});
// 					}
// 				} catch (error) {
// 					res.status(500).json({ error: error.message });
// 				}
// 			});
// 		});

// 		request.on("error", (error) => {
// 			res.status(500).json({ error: error.message });
// 		});

// 		request.end();
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// module.exports = getVideogameByName;
