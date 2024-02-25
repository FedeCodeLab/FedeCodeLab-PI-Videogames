import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailModules.css";
import { Link } from "react-router-dom";

const Detail = () => {
	const [gameDb, setGameDb] = useState({});
	const [gameApi, setGameApi] = useState({});
	const [genres, setGenres] = useState([]);
	const [platforms, setPlatforms] = useState([]);
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
					setPlatforms(data[2]);
					console.log(data);
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
							setPlatforms(data.platforms);
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
		<section className="detail">
			{Object.keys(gameDb).length > 0 ? (
				<div className="detailContainer">
					<div className="image">
						{gameDb.background_image && (
							<img src={gameDb.background_image} alt="image" />
						)}
					</div>
					{gameDb.name && <h1>{gameDb.name}</h1>}

					<div className="detailGame container">
						{gameDb.description && <p>{gameDb.description}</p>}

						<div className="data">
							<div className="left">
								<h2>Información detallada:</h2>
								{gameDb.releaseDate && (
									<p>
										<span className="blue">Fecha de lanzamiento: </span>
										{gameDb.releaseDate}
									</p>
								)}

								{gameDb.rating && (
									<p>
										<span className="blue">Rating: </span>
										{gameDb.rating}⭐
									</p>
								)}

								{gameDb.id && (
									<p>
										<span className="blue">Id: </span>
										{gameDb.id}
									</p>
								)}

								{platforms.length > 0 && (
									<div className="detailGenres">
										<p className="blue">Plataformas:</p>
										<ul>
											{platforms.map((platform, index) => (
												<li key={index}>{platform.name}</li>
											))}
										</ul>
									</div>
								)}

								{genres.length > 0 && (
									<div className="detailGenres">
										<p className="blue">Generos:</p>
										<ul>
											{genres.map((genre, index) => (
												<li key={index}>{genre.name}</li>
											))}
										</ul>
									</div>
								)}
							</div>
							<div className="right">
								{gameDb.background_image_additional && (
									<img src={gameDb.background_image_additional} alt="image" />
								)}
							</div>
						</div>
					</div>
				</div>
			) : Object.keys(gameApi).length > 0 ? (
				<div className="detailContainer">
					<div className="image">
						{gameApi.background_image && (
							<img src={gameApi.background_image} alt="image" />
						)}
					</div>
					{gameApi.name && <h1>{gameApi.name}</h1>}
					<div className="detailGame container">
						{gameApi.description && <p>{gameApi.description}</p>}

						<div className="data">
							<div className="left">
								<h2>Información detallada:</h2>
								{gameApi.website && (
									<Link target="_blank" to={gameApi.website}>
										<span className="blue">Website: </span>
										{gameApi.website}
									</Link>
								)}
								{gameApi.released && (
									<p>
										<span className="blue">Fecha de Lanzamiento: </span>
										{gameApi.released}
									</p>
								)}
								{gameApi.rating && (
									<p>
										<span className="blue">Rating: </span>
										{gameApi.rating}⭐
									</p>
								)}
								{gameApi.id && (
									<p>
										<span className="blue">Id: </span>
										{gameApi.id}
									</p>
								)}
								{gameApi.platforms && (
									<div className="platforms">
										<p className="blue">Plataformas:</p>
										<ul>
											{gameApi.platforms.map((platform, index) => (
												<li key={index}>{platform.platform.name}</li>
											))}
										</ul>
									</div>
								)}
								{gameApi.genres && (
									<div className="genres">
										<p className="blue">Generos: </p>
										<ul>
											{gameApi.genres.map((g, index) => (
												<li key={index}>{g.name}</li>
											))}
										</ul>
									</div>
								)}
							</div>
							<div className="right">
								{gameApi.background_image_additional && (
									<img src={gameApi.background_image_additional} alt="image" />
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="loader">
					<div class="custom-loader"></div>
				</div>
			)}
		</section>
	);
};

export default Detail;
