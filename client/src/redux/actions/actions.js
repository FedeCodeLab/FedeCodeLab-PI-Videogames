import { FETCH_GAMES, FETCH_GENRES, POST_GAMES, FETCH_API } from "./types";
import axios from "axios";

// ? ---------------------------------------------- Fetch videogames from database

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

// ? ---------------------------------------------- Fetch videogames from API

export function fetchApiVideogames() {
	return async (dispatch) => {
		try {
			const response = await fetch(
				"https://api.rawg.io/api/games?key=7e004c896a9847c2a84c6821d02da5c1&page=1&page_size=100"
			);
			const data = await response.json();
			dispatch({
				type: FETCH_API,
				payload: data,
			});
		} catch (error) {
			console.error("Error fetching videogames: ", error);
			// Manejo de errores aquí, si es necesario
		}
	};
}

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
