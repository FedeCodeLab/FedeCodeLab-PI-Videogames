import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailModules.css";

const Detail = () => {
	const [gameDb, setGameDb] = useState({});
	const [gameApi, setGameApi] = useState({});
	const [genres, setGenres] = useState([]);
	let { id } = useParams();

	useEffect(() => {
		fetch(`http://localhost:3001/videogames/id/${id}`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Local server request failed");
				}
			})
			.then((data) => {
				if (data) {
					setGameDb(data[0]);
					setGenres(data[1]);
				}
			})
			.catch((err) => {
				fetch(
					`https://api.rawg.io/api/games/${id}?key=7e004c896a9847c2a84c6821d02da5c1`
				)
					.then((res) => {
						if (res.ok) {
							return res.json();
						} else {
							throw new Error("API request failed");
						}
					})
					.then((data) => {
						if (data) {
							setGameApi(data);
							setGenres(data.genres);
						} else {
							throw new Error(
								"No se encontró un juego con ese id en la API de RAWG"
							);
						}
					})
					.catch((err) => console.error(err));
			});
	}, [id]);

	return (
		<section className="detail container">
			<h1>detail</h1>
			{Object.keys(gameDb).length > 0 ? (
				<div className="detailGame">
					{gameDb.background_image && (
						<img src={gameDb.background_image} alt="image" />
					)}
					{gameDb.name && <h1>{gameDb.name}</h1>}
					{gameDb.id && (
						<p>
							<span>Id: </span>
							{gameDb.id}
						</p>
					)}
					{gameDb.platforms && (
						<p>
							<span>Plataformas: </span>
							{gameDb.platforms}
						</p>
					)}
					{gameDb.releaseDate && (
						<p>
							<span>Fecha de lanzamiento: </span>
							{gameDb.releaseDate}
						</p>
					)}
					{gameDb.rating && (
						<p>
							<span>Rating: </span>
							{gameDb.rating}
						</p>
					)}
					{gameDb.description && (
						<p>
							<span>Descripción: </span>
							{gameDb.description}
						</p>
					)}
					{genres.length > 0 && (
						<div className="detailGenres">
							<div className="grid">
								{genres.map((genre) => (
									<div className="genre" key={genre.id}>
										<h3>{genre.name}</h3>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			) : Object.keys(gameApi).length > 0 ? (
				<div className="detailGame">
					{gameApi.background_image && (
						<img src={gameApi.background_image} alt="image" />
					)}
					{gameApi.name && <h1>{gameApi.name}</h1>}
					{gameApi.id && <p>{gameApi.id}</p>}
					{gameApi.description && <p>{gameApi.description}</p>}
				</div>
			) : (
				<p>No se encontró información sobre el juego.</p>
			)}
		</section>
	);
};

export default Detail;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "./DetailModules.css";

// const Detail = () => {
// 	const [game, setGame] = useState({});
// 	const [genres, setGenres] = useState([]);
// 	let { id } = useParams();

// 	useEffect(() => {
// 		fetch(`http://localhost:3001/videogames/id/${id}`)
// 			.then((res) => res.json())
// 			.then((data) => {
// 				if (data) {
// 					setGame(data[0]); // Primer objeto es la información del país
// 					setGenres(data[1]); // Segundo objeto es el array de actividades
// 				} else {
// 					alert("No se encontró un juego con ese id");
// 				}
// 			})
// 			.catch((err) => window.alert("No existe juego con ese id"));
// 	}, [id]);
// 	return (
// 		<section className="detail container">
// 			<h1>detail</h1>
// 			{Object.keys(game).length > 0 && (
// 				<div className="detailGame">
// 					{game.background_image && (
// 						<img src={game.background_image} alt="image" />
// 					)}
// 					{game.name && <h1>{game.name}</h1>}
// 					{game.id && (
// 						<p>
// 							<span>Id: </span>
// 							{game.id}
// 						</p>
// 					)}
// 					{game.platforms && (
// 						<p>
// 							<span>Plataformas: </span>
// 							{game.platforms}
// 						</p>
// 					)}
// 					{game.releaseDate && (
// 						<p>
// 							<span>Fecha de lanzamiento: </span>
// 							{game.releaseDate}
// 						</p>
// 					)}

// 					{game.rating && (
// 						<p>
// 							<span>Rating: </span>
// 							{game.rating}
// 						</p>
// 					)}
// 					{game.description && (
// 						<p>
// 							<span>Descripción: </span>
// 							{game.description}
// 						</p>
// 					)}
// 				</div>
// 			)}

// 			{genres.length > 0 && (
// 				<div className="detailGenres">
// 					<div className="grid">
// 						{genres.map((genre) => (
// 							<div className="genre" key={genre.id}>
// 								<h3>{genre.name}</h3>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			)}
// 		</section>
// 	);
// };

// export default Detail;
