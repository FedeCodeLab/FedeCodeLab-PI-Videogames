import React from "react";
import Card from "../card/Card";
import "./CardsModules.css";

export default function ApiCards({ data }) {
	if (!data) {
		return <p>Cargando...</p>;
	}

	return (
		<section className="container">
			<h1>Juegos:</h1>
			<div className="cards">
				{data.map(
					({ id, name, image, background_image, rating, genres, Genres }) => (
						<Card
							key={id}
							id={id}
							name={name}
							image={image}
							background_image={background_image}
							rating={rating}
							genres={
								(genres && genres.map((genre) => genre.name).join(", ")) ||
								(Genres && Genres.map((genre) => genre.name).join(", "))
							}
						/>
					)
				)}
			</div>
		</section>
	);
}
