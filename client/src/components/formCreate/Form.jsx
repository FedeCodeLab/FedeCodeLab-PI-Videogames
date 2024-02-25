import "./FormModules.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchGenres,
	postGames,
	fetchPlatforms,
} from "../../redux/actions/actions";
import { validation } from "./validation";

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

	// ? ---------------------------------------- Error

	const [error, setError] = useState({
		name: "",
		description: "",
		background_image: "",
		background_image_additional: "",
		releaseDate: "",
		rating: "",
		genres: "",
		platforms: "",
	});

	// ? ---------------------------------------- onChange

	const onChange = (e) => {
		const { name, value } = e.target;
		setVideogame({ ...videogame, [name]: value });
		setError(
			validation({
				...videogame,
				[name]: value,
			})
		);
	};

	// ? ---------------------------------------- onSubmit

	const onSubmit = async (e) => {
		console.log(error);
		e.preventDefault();
		if (
			!videogame.name ||
			!videogame.description ||
			!videogame.background_image ||
			!videogame.background_image_additional ||
			!videogame.rating ||
			!videogame.genres ||
			!videogame.platforms
		) {
			alert("Ningún campo puede estar vacío");
		} else {
			await dispatch(postGames(videogame));
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
			alert("¡El juego fue creado exitosamente!");
		}
	};

	// ? ---------------------------------------- onClick

	const onClick = (e) => {
		const { value, name } = e.target;
		if (name === "genres") {
			setVideogame({ ...videogame, genres: [...videogame.genres, value] });
			setError(
				validation({
					...videogame,
					genres: [...videogame.genres, value],
				})
			);
		} else {
			setVideogame({
				...videogame,
				platforms: [...videogame.platforms, value],
			});
			setError(
				validation({
					...videogame,
					platforms: [...videogame.platforms, value],
				})
			);
		}
	};

	// ? ---------------------------------------- Genre

	const deleteGenre = (genre) => {
		const updatedGenres = videogame.genres.filter((g) => g !== genre);
		setVideogame({
			...videogame,
			genres: updatedGenres,
		});
		setError(
			validation({
				...videogame,
				genres: updatedGenres,
			})
		);
	};

	const deletePlatform = (platform) => {
		const updatedPlatforms = videogame.platforms.filter((p) => p !== platform);
		setVideogame({
			...videogame,
			platforms: updatedPlatforms,
		});
		setError(
			validation({
				...videogame,
				platforms: updatedPlatforms,
			})
		);
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
					{error.name && <p className="error">{error.name}</p>}
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
						{error.rating && <p className="error">{error.rating}</p>}
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
						{error.releaseDate && <p className="error">{error.releaseDate}</p>}
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
						{error.background_image && (
							<p className="error">{error.background_image}</p>
						)}
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
						{error.background_image_additional && (
							<p className="error">{error.background_image_additional}</p>
						)}
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
						{error.genres && <p className="error">{error.genres}</p>}{" "}
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
						{error.platforms && <p className="error">{error.platforms}</p>}
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
				{error.description && <p className="error">{error.description}</p>}
				<button type="submit">Publicar</button>
			</div>
		</form>
	);
}
