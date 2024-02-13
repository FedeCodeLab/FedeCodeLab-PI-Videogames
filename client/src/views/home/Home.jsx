// Home.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchVideogames,
	fetchApiVideogames,
} from "../../redux/actions/actions";
import ApiCards from "../../components/apiCards/ApiCards";

export default function Home() {
	const dispatch = useDispatch();

	const allVideogames = useSelector((state) => state.allVideogames);
	const apiVideogames = useSelector((state) => state.apiVideogames);

	useEffect(() => {
		dispatch(fetchVideogames());
		dispatch(fetchApiVideogames());
	}, [dispatch]);

	// Combina los juegos de la API y los de la base de datos en una sola lista
	const combinedData = [...allVideogames, ...(apiVideogames.results || [])];

	return (
		<section className="home container">
			<ApiCards data={combinedData} />
		</section>
	);
}
