const { Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;

const getAllGenres = async (req, res) => {
	try {
		const api = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
		const data = await api.json();
		const map = data.results.map((m) => ({
			name: m.name,
		}));
		console.log(map);
		await Genre.bulkCreate(map);
		res.status(200).json({ message: "Genres inserted successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getAllGenres;
