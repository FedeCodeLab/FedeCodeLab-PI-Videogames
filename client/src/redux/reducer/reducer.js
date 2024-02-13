import {
	FETCH_GAMES,
	FETCH_GENRES,
	POST_GAMES,
	FETCH_API,
} from "../actions/types";

const initialState = {
	allVideogames: [],
	allGenres: [],
	apiVideogames: [],
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
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

		// ?--------------------------------------------- Fetch Games API

		case FETCH_API:
			return {
				...state,
				apiVideogames: action.payload,
			};

		// ?--------------------------------------------- Post Games

		case POST_GAMES:
			const { payload } = action;
			console.log("Esto es un payload", payload);
			return {
				...state,
				allVideogames: [...state.allVideogames, payload],
			};

		default:
			return {
				...state,
			};
	}
}
