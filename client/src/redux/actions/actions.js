import {
	FETCH_GAMES,
	FETCH_GENRES,
	POST_GAMES,
	FETCH_PLATFORMS,
	SORT_ALPHABETICAL,
	RESET,
	FETCH_DB_GAMES,
	FILTER_GENRES,
	GET_NAME,
} from "./types";
import axios from "axios";

// ! --------------------------------------------- Fetch ---------------------------------------------

// ? ---------------------------------------------- Fetch videogames

export function fetchVideogames() {
	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:3001/videogames");
			const data = await response.json();
			dispatch({
				type: FETCH_GAMES,
				payload: data,
			});
		} catch (error) {
			console.error("Error fetching videogames: ", error);
			// Manejo de errores aquí, si es necesario
		}
	};
}

// ? ---------------------------------------------- Fetch genres from database

export function fetchGenres() {
	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:3001/genres");
			const data = await response.json();
			dispatch({
				type: FETCH_GENRES,
				payload: data,
			});
		} catch (error) {
			console.error("Error fetching genres: ", error);
		}
	};
}

// ? ---------------------------------------------- Fetch platforms from database

export function fetchPlatforms() {
	return async (dispatch) => {
		try {
			const response = await fetch("http://localhost:3001/platforms");
			const data = await response.json();
			dispatch({
				type: FETCH_PLATFORMS,
				payload: data,
			});
		} catch (error) {
			console.error("Error fetching platforms: ", error);
		}
	};
}

// ! --------------------------------------------- Post ---------------------------------------------

// ? ---------------------------------------------- Post game on database

export function postGames(payload) {
	return async function (dispatch) {
		try {
			const response = await axios.post(
				"http://localhost:3001/videogames",
				payload
			);
			dispatch({
				type: POST_GAMES,
				payload: response.data,
			});
		} catch (error) {
			console.error("Tienes un error en: ", error);
		}
	};
}

// ! --------------------------------------------- Filters ---------------------------------------------

// ? --------------------------------------------- Sort by alphabetical

export function sortByAlphabetical(order) {
	return {
		type: SORT_ALPHABETICAL,
		payload: order,
	};
}

// ? ---------------------------------------------- By Database

export function originVideogames(action) {
	return async (dispatch) => {
		switch (action) {
			case "Db":
				try {
					const response = await fetch("http://localhost:3001/dbvideogames");
					const data = await response.json();
					dispatch({
						type: FETCH_DB_GAMES,
						payload: data,
					});
				} catch (error) {
					console.error("Error fetching videogames: ", error);
					// Manejo de errores aquí, si es necesario
				}
				break;
			case "Api":
				try {
					const response = await fetch("http://localhost:3001/apivideogames");
					const data = await response.json();
					dispatch({
						type: FETCH_DB_GAMES,
						payload: data,
					});
				} catch (error) {
					console.error("Error fetching videogames: ", error);
					// Manejo de errores aquí, si es necesario
				}
				break;
			default:
				break;
		}
	};
}

// ? ---------------------------------------------- Filter by Genres

export const filterGenres = (genre) => {
	return {
		type: FILTER_GENRES,
		payload: genre,
	};
};

// ? ----------------------------------------------- Get games by name (input)

export const getGamesByName = (name) => {
	return async function (dispatch) {
		try {
			let response = await fetch(
				`http://localhost:3001/videogames/name?name=${name}`
			);
			if (!response.ok) {
				throw new Error("Videogame not found");
			}
			let videogame = await response.json();
			return dispatch({
				type: GET_NAME,
				payload: videogame,
			});
		} catch (error) {
			alert(error.message);
		}
	};
};

// ? ---------------------------------------------- Reset

export const resetVideogames = () => {
	return {
		type: RESET,
	};
};
