import "./FormModules.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchGenres,
	postGames,
	fetchPlatforms,
} from "../../redux/actions/actions";

export default function Form() {
	const dispatch = useDispatch();

	// ?------------------------------------ useSelector y UseEffect

	const allGenres = useSelector((state) => state.allGenres);
	const allPlatforms = useSelector((state) => state.allPlatforms);

	useEffect(() => {
		dispatch(fetchGenres());
		dispatch(fetchPlatforms());
	}, [dispatch]);

	// ? ---------------------------------------- Estado de videogame

	const [videogame, setVideogame] = useState({
		name: "",
		description: "",
		background_image: "",
		background_image_additional: "",
		releaseDate: "",
		rating: "",
		genres: [],
		platforms: [],
	});

	// ? ---------------------------------------- onChange

	const onChange = (e) => {
		const { name, value } = e.target;
		setVideogame({ ...videogame, [name]: value });
	};

	// ? ---------------------------------------- onSubmit

	const onSubmit = (e) => {
		console.log(videogame);
		e.preventDefault();
		dispatch(postGames(videogame));
		setVideogame({
			name: "",
			description: "",
			background_image: "",
			background_image_additional: "",
			releaseDate: "",
			rating: "",
			genres: [],
			platforms: [],
		});
	};

	// ? ---------------------------------------- onClick

	const onClick = (e) => {
		const { value, name } = e.target;
		if (name === "genres") {
			setVideogame({ ...videogame, genres: [...videogame.genres, value] });
		} else {
			setVideogame({
				...videogame,
				platforms: [...videogame.platforms, value],
			});
		}
	};

	// ? ---------------------------------------- Genre

	const deleteGenre = (genre) => {
		setVideogame({
			...videogame,
			genres: videogame.genres.filter((g) => g !== genre),
		});
	};

	// ? ---------------------------------------- Platform

	const deletePlatform = (platform) => {
		setVideogame({
			...videogame,
			platforms: videogame.platforms.filter((g) => g !== platform),
		});
	};

	// ?------------------------------------------- Return

	return (
		<form className="formCreate" onSubmit={onSubmit}>
			<h2>Crear nuevo videojuego</h2>
			<div className="inputs">
				<div>
					<label htmlFor="name">Nombre del videojuego:</label>
					<input
						type="text"
						name="name"
						placeholder="Nombre"
						value={videogame.name}
						onChange={onChange}
					/>
				</div>

				{/* ----------------------------------- Rating ---------------------------------- */}

				<div className="flex">
					<div>
						<label htmlFor="rating">Rating:</label>
						<input
							type="number"
							name="rating"
							min="1"
							max="5"
							step="0.01" // Esto permite números decimales
							value={videogame.rating}
							onChange={onChange}
							placeholder="5.00"
						/>
					</div>

					{/* ----------------------------------- Fecha ---------------------------------- */}

					<div>
						<label htmlFor="releaseDate">Fecha de lanzamiento:</label>
						<input
							type="date"
							name="releaseDate"
							value={videogame.releaseDate}
							onChange={onChange}
						/>
					</div>
				</div>

				{/* ----------------------------------- Images ---------------------------------- */}

				<div className="flex">
					<div>
						<label htmlFor="background_image">Imagen:</label>
						<input
							type="text"
							name="background_image"
							value={videogame.background_image}
							onChange={onChange}
							placeholder="https://images..."
						/>
					</div>

					<div>
						<label htmlFor="background_image_additional">
							Imagen adicional:
						</label>
						<input
							type="text"
							name="background_image_additional"
							value={videogame.background_image_additional}
							onChange={onChange}
							placeholder="https://images..."
						/>
					</div>
				</div>

				{/* ----------------------------------- Generos y Plataformas  ---------------------------------- */}

				<div className="flex">
					<div>
						<label htmlFor="genres">Generos:</label>
						<div className="flex">
							<select name="genres" id="genres" value="" onChange={onClick}>
								<option value="">Seleccione los generos</option>
								{allGenres.map((genre) => (
									<option key={genre.id} value={genre.name}>
										{genre.name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div>
						<label htmlFor="platforms">Plataformas:</label>
						<div className="flex">
							<select
								name="platforms"
								id="platforms"
								value=""
								onChange={onClick}
							>
								<option value="">Seleccione las plataformas</option>
								{allPlatforms.map((platform) => (
									<option key={platform.id} value={platform.name}>
										{platform.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* ----------------------------------- List ---------------------------------- */}

				<div className="list">
					<ul>
						{videogame.genres.map((genre, index) => (
							<li key={index}>
								{genre}
								<button type="button" onClick={() => deleteGenre(genre)}>
									x
								</button>
							</li>
						))}
						{videogame.platforms.map((platform, index) => (
							<li key={index}>
								{platform}
								<button type="button" onClick={() => deletePlatform(platform)}>
									x
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* ----------------------------------- Description ---------------------------------- */}

				<div>
					<label htmlFor="description">Descripción:</label>
					<textarea
						type="text"
						name="description"
						value={videogame.description}
						onChange={onChange}
						placeholder="The Last of Us es un juego de..."
					/>
				</div>

				<button type="submit">Publicar</button>
			</div>
		</form>
	);
}
