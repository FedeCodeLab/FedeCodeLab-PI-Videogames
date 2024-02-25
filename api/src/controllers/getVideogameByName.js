const { Op } = require("sequelize");
const { Videogame, Genre, Platform } = require("../db");
const getAllVideogames = require("./getAllVideogames"); // Importa el controlador getAllVideogames
require("dotenv").config();
const { API_KEY } = process.env;

const getVideogameByName = async (req, res) => {
	const { name } = req.query;
	try {
		// Obtener todos los videojuegos
		const allVideogames = await getAllVideogames(req, res);

		// Filtrar los videojuegos por nombre
		const filteredVideogames = allVideogames.filter((videogame) => {
			return videogame.name.toLowerCase().includes(name.toLowerCase());
		});

		if (filteredVideogames.length > 0) {
			res.status(200).json(filteredVideogames);
		} else {
			res.status(400).json({ message: "No se encontró ningún juego" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = getVideogameByName;
