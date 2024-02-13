const { Genre } = require("../db");

const getGenres = async (req, res) => {
	try {
		const allGenres = await Genre.findAll();
		res.status(200).json(allGenres);
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = getGenres;
