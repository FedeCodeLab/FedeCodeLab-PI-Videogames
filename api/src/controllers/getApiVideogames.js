const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getApiVideogames = async (req, res) => {
	try {
		const pageSize = 40;
		const totalPages = Math.ceil(100 / pageSize);
		const apiGames = [];

		for (let page = 1; page <= totalPages; page++) {
			const response = await axios.get("https://api.rawg.io/api/games", {
				params: {
					key: API_KEY,
					page: page,
					page_size: pageSize,
				},
			});
			apiGames.push(...response.data.results);
		}

		const slicedGames = apiGames.slice(0, 100);
		res.status(200).json(slicedGames);
	} catch (error) {
		console.error("Error fetching videogames from API: ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = getApiVideogames;
