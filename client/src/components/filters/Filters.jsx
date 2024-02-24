import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	sortByAlphabetical,
	originVideogames,
	resetVideogames,
	fetchGenres,
	filterGenres,
	getGamesByName,
} from "../../redux/actions/actions";

export default function Filters({ filterVideogames }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	const allGenres = useSelector((state) => state.allGenres);

	const handleChange = (e) => {
		let { name, value } = e.target;

		if (name === "orderAlph") {
			dispatch(sortByAlphabetical(value));
		} else if (name === "origin") {
			dispatch(originVideogames(value));
		} else if (name === "genres") {
			console.log(filterVideogames);
			dispatch(filterGenres(value));
		}
	};

	// ?---------------------------------------------------- handleClick

	const handleClick = () => {
		dispatch(resetVideogames());
	};

	// ?---------------------------------------------------- SEARCH

	const search = (e) => {
		const { value } = e.target;
		setName(value);
		console.log(name);
	};

	const handleSubmit = () => {
		dispatch(getGamesByName(name));
	};

	return (
		<div className="filters container">
			{/* -------------------------------- Order Alphabetically ------------------------------------ */}

			<select
				name="orderAlph"
				id="order"
				onChange={handleChange}
				defaultValue="placeholder"
			>
				<option value="placeholder" disabled>
					Sort Alphabetically
				</option>
				<option value="Asc">Ascendente</option>
				<option value="Desc">Descendente</option>
			</select>

			{/* -------------------------------- Origin ------------------------------------ */}

			<select
				name="origin"
				id="order"
				onChange={handleChange}
				defaultValue="placeholder"
			>
				<option value="placeholder" disabled>
					Origin
				</option>
				<option value="Db">Database</option>
				<option value="Api">API</option>
			</select>

			{/* -------------------------------- Genres ------------------------------------ */}

			<select name="genres" id="genres" onChange={handleChange}>
				<option value="">Seleccione los generos</option>
				{allGenres.map((genre) => (
					<option key={genre.id} value={genre.name}>
						{genre.name}
					</option>
				))}
			</select>

			{/* -------------------------------- SearchBar ------------------------------------ */}

			<div className="searchBar">
				<input type="search" onChange={search} placeholder="The Last of..." />
				<button onClick={handleSubmit}>Buscar</button>
			</div>

			{/* -------------------------------- Reset ------------------------------------ */}

			<button onClick={handleClick}>Reset</button>
		</div>
	);
}
