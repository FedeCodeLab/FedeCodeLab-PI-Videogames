const { Genre } = require("../db");

const getAllGenres = async (req, res) => {
	try {
		const api = await fetch(
			"https://api.rawg.io/api/genres?key=7e004c896a9847c2a84c6821d02da5c1"
		);
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
