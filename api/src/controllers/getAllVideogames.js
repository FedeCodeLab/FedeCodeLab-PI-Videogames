const https = require("https");
const { Videogame, Genre, Platform } = require("../db");

const getAllVideogames = async (req, res) => {
	try {
		let apiGames = [];
		const pageSize = 40;
		const totalPages = Math.ceil(100 / pageSize);

		// Función para realizar una solicitud GET a la API
		const fetchPage = (page) => {
			return new Promise((resolve, reject) => {
				https
					.get(
						`https://api.rawg.io/api/games?key=7e004c896a9847c2a84c6821d02da5c1&page=${page}&page_size=${pageSize}`,
						(response) => {
							let data = "";

							// Recibiendo datos
							response.on("data", (chunk) => {
								data += chunk;
							});

							// Fin de la respuesta
							response.on("end", () => {
								try {
									const jsonData = JSON.parse(data);
									resolve(jsonData.results);
								} catch (error) {
									console.error("Error parsing JSON: ", error);
									reject(error);
								}
							});
						}
					)
					.on("error", (error) => {
						console.error("Error fetching videogames from API: ", error);
						reject(error);
					});
			});
		};

		// Iterar sobre las páginas y realizar las solicitudes
		const requests = [];
		for (let page = 1; page <= totalPages; page++) {
			requests.push(fetchPage(page));
		}

		// Esperar a que todas las solicitudes se completen
		const responses = await Promise.all(requests);
		// Concatenar los resultados de todas las páginas
		responses.forEach((data) => {
			apiGames = apiGames.concat(data);
		});
		// Cortar el array para tener solo los primeros 100 juegos
		apiGames = apiGames.slice(0, 100);

		// Obtener juegos de la base de datos
		const dbVideogames = await Videogame.findAll({
			include: [{ model: Genre }, { model: Platform }],
		});

		// Combinar los juegos de la base de datos y de la API
		const allVideogames = [...dbVideogames, ...apiGames];

		res.status(200).json(allVideogames);
	} catch (error) {
		console.error("Error fetching videogames: ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = getAllVideogames;
