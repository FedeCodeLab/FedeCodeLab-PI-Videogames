import {
	FETCH_GAMES,
	FETCH_GENRES,
	POST_GAMES,
	FETCH_PLATFORMS,
	SORT_ALPHABETICAL,
	FETCH_DB_GAMES,
	FILTER_GENRES,
	RESET,
	GET_NAME,
	TOGGLE_SIDEBAR,
} from "../actions/types";

const initialState = {
	allVideogames: [],
	allGenres: [],
	allPlatforms: [],
	filterVideogames: [],
	sidebar: {
		isVisible: false,
	},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		// ! --------------------------------------------- Fetchs ---------------------------------------------

		// ?--------------------------------------------- Fetch Games

		case FETCH_GAMES:
			return {
				...state,
				allVideogames: action.payload,
			};

		// ?--------------------------------------------- Fetch Genres

		case FETCH_GENRES:
			return {
				...state,
				allGenres: action.payload,
			};

		// ?--------------------------------------------- Fetch Platforms

		case FETCH_PLATFORMS:
			return {
				...state,
				allPlatforms: action.payload,
			};

		// ! --------------------------------------------- Post ---------------------------------------------

		// ?--------------------------------------------- Post Games

		case POST_GAMES:
			const { payload } = action;
			console.log("Esto es un payload", payload);
			return {
				...state,
				allVideogames: [...state.allVideogames, payload],
			};

		// ! --------------------------------------------- Filters ---------------------------------------------

		// ? --------------------------------------------------- SORT_ALPHABETICAL

		case SORT_ALPHABETICAL:
			let orderedGames = [...state.allVideogames];

			switch (action.payload) {
				case "Asc":
					orderedGames.sort((a, b) => a.name.localeCompare(b.name));
					break;
				case "Desc":
					orderedGames.sort((a, b) => b.name.localeCompare(a.name));
					break;
				default:
					break;
			}

			return {
				...state,
				filterVideogames: orderedGames,
			};

		// ? --------------------------------------------------- FETCH_DB_GAMES

		case FETCH_DB_GAMES:
			return {
				...state,
				filterVideogames: action.payload, // Actualizamos filterVideogames con los juegos filtrados
			};

		// ? ------------------------------------------------------ FILTER_GENRES
		case FILTER_GENRES:
			const { allVideogames } = state;
			const { payload: selectedGenre } = action;

			let filteredGenres;
			if (!selectedGenre || selectedGenre === "Todos") {
				// Si no se selecciona un género específico o se selecciona "Todos", incluir todos los juegos
				filteredGenres = allVideogames;
			} else {
				// Filtrar los juegos basados en el género seleccionado
				filteredGenres = allVideogames.filter((game) => {
					// Verificar si el juego tiene información de género
					if (game.Genres || game.genres) {
						// Comprobar ambas claves "Genres" y "genres" para mayor compatibilidad
						const gameGenres = game.Genres || game.genres;
						return gameGenres.some((genre) => genre.name === selectedGenre);
					} else {
						// Si el juego no tiene información de género, incluirlo en el filtro
						return true;
					}
				});
			}

			console.log("Filtered Genres:", filteredGenres); // Verificar los juegos filtrados
			return {
				...state,
				filterVideogames: filteredGenres,
			};

		// ? --------------------------------------------------- GET_NAME

		case GET_NAME:
			return {
				...state,
				filterVideogames: action.payload,
			};

		// ? --------------------------------------------------- Reset

		case RESET:
			return {
				...state,
				filterVideogames: [],
			};

		// ? ---------------------------------------------------- Togle

		case TOGGLE_SIDEBAR:
			return {
				...state,
				sidebar: {
					...state.sidebar,
					isVisible: !state.sidebar.isVisible,
				},
			};

		// ! --------------------------------------------- Default ---------------------------------------------

		default:
			return {
				...state,
			};
	}
}
