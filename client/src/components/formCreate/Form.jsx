import "./FormModules.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenres, postGames } from "../../redux/actions/actions";

export default function Form() {
	const dispatch = useDispatch();

	// ?------------------------------------ useSelector y UseEffect

	const allGenres = useSelector((state) => state.allGenres);

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);
	console.log(allGenres);

	const [videogame, setVideogame] = useState({
		name: "",
		description: "",
		platforms: "",
		background_image: "",
		releaseDate: "",
		rating: "",
		genres: [],
	});

	const onChange = (e) => {
		const { name, value } = e.target;
		setVideogame({ ...videogame, [name]: value });
	};

	const onSubmit = (e) => {
		console.log(videogame);
		e.preventDefault();
		dispatch(postGames(videogame));
		setVideogame({
			name: "",
			description: "",
			platforms: "",
			background_image: "",
			releaseDate: "",
			rating: "",
			genres: [],
		});
	};

	const onClick = (e) => {
		const { value } = e.target;
		setVideogame({ ...videogame, genres: [...videogame.genres, value] });
	};

	const deleteGenre = (genre) => {
		setVideogame({
			...videogame,
			genres: videogame.genres.filter((g) => g !== genre),
		});
	};

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
						/>
					</div>
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

				<div>
					<label htmlFor="platforms">Plataformas:</label>
					<input
						type="text"
						name="platforms"
						value={videogame.platforms}
						onChange={onChange}
						placeholder="Tu juego está disponible en..."
					/>
				</div>

				<div>
					<label htmlFor="background_image">Imagen:</label>
					<input
						type="text"
						name="background_image"
						value={videogame.background_image}
						onChange={onChange}
						placeholder="Ingrese el link de la imagen"
					/>
				</div>

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
					</ul>
				</div>

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
