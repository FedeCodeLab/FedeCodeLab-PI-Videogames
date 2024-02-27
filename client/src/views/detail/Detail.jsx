import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailModules.css";
import { Link } from "react-router-dom";

const Detail = () => {
	const [game, setGame] = useState({});
	let { id } = useParams();

	useEffect(() => {
		fetch(`http://localhost:3001/videogames/id/${id}`)
			.then((response) => response.json())
			.then((data) => setGame(data));
	}, []);
	console.log(game);

	return (
		<section className="detail">
			{Object.keys(game).length > 0 ? (
				<div className="detailContainer">
					<div className="image">
						{game.background_image && (
							<img src={game.background_image} alt="image" />
						)}
					</div>
					{game.name && <h1>{game.name}</h1>}

					<div className="detailGame container">
						{game.description && <p>{game.description}</p>}

						<div className="data">
							<div className="left">
								<h2>Información detallada:</h2>
								{game.releaseDate && (
									<p>
										<span className="blue">Fecha de lanzamiento: </span>
										{game.releaseDate}
									</p>
								)}

								{game.rating && (
									<p>
										<span className="blue">Rating: </span>
										{game.rating}⭐
									</p>
								)}

								{game.id && (
									<p>
										<span className="blue">Id: </span>
										{game.id}
									</p>
								)}

								{game.platforms && (
									<div className="platforms">
										<p className="blue">Plataformas:</p>
										<ul>
											{game.platforms.map((p, index) => (
												<li key={index}>{p}</li>
											))}
										</ul>
									</div>
								)}
								{game.genres && (
									<div className="genres">
										<p className="blue">Generos: </p>
										<ul>
											{game.genres.map((g, index) => (
												<li key={index}>{g.name}</li>
											))}
										</ul>
									</div>
								)}

								{game.Platforms && (
									<div className="platforms">
										<p className="blue">Plataformas:</p>
										<ul>
											{game.Platforms.map((p, index) => (
												<li key={index}>{p.name}</li>
											))}
										</ul>
									</div>
								)}

								{game.Genres && (
									<div className="Genres">
										<p className="blue">Generos: </p>
										<ul>
											{game.Genres.map((g, index) => (
												<li key={index}>{g.name}</li>
											))}
										</ul>
									</div>
								)}
							</div>
							<div className="right">
								{game.background_image_additional && (
									<img src={game.background_image_additional} alt="image" />
								)}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="loader">
					<div className="custom-loader"></div>
				</div>
			)}
		</section>
	);
};

export default Detail;
