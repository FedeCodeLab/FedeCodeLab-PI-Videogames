import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	sort,
	originVideogames,
	resetVideogames,
	fetchGenres,
	filterGenres,
	getGamesByName,
} from "../../redux/actions/actions";
import "./Filters.css";

export default function Filters({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	const allGenres = useSelector((state) => state.allGenres);

	const handleChange = (e) => {
		let { name, value } = e.target;

		if (name === "orderAlph") {
			dispatch(sort(value));
			setCurrentPage(1);
		} else if (name === "origin") {
			dispatch(originVideogames(value));
			setCurrentPage(1);
		} else if (name === "genres") {
			dispatch(filterGenres(value));
			setCurrentPage(1);
		}
	};

	// ?---------------------------------------------------- handleClick

	const handleClick = () => {
		dispatch(resetVideogames());
		setCurrentPage(1);
	};

	// ?---------------------------------------------------- SEARCH

	const search = (e) => {
		const { value } = e.target;
		setName(value);
	};

	const handleSubmit = () => {
		dispatch(getGamesByName(name));
		setCurrentPage(1);
	};

	return (
		<div className="filters container">
			<div className="filter-left">
				{/* -------------------------------- Order Alphabetically ------------------------------------ */}

				<select
					name="orderAlph"
					id="order"
					onChange={handleChange}
					defaultValue="placeholder"
				>
					<option value="placeholder" disabled>
						Ordenar
					</option>
					<option value="Asc">Nombres Asc</option>
					<option value="Desc">Nombres Desc</option>
					<option value="higRating">Rating más alto</option>
					<option value="lowrating">Rating más bajo</option>
				</select>

				{/* -------------------------------- Origin ------------------------------------ */}

				<select
					name="origin"
					id="order"
					onChange={handleChange}
					defaultValue="placeholder"
				>
					<option value="placeholder" disabled>
						Origen
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

				{/* -------------------------------- Reset ------------------------------------ */}

				<button onClick={handleClick}>Reset</button>
			</div>

			<div className="searchBar">
				<input type="search" onChange={search} placeholder="The Last of..." />
				<button onClick={handleSubmit}>Buscar</button>
			</div>
		</div>
	);
}
