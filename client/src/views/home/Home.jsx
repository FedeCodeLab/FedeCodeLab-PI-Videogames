import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideogames } from "../../redux/actions/actions";
import ApiCards from "../../components/apiCards/ApiCards";
import Pagination from "../../components/pagination/Pagination";
import Filters from "../../components/filters/Filters";

export default function Home() {
	// useSelector y States
	const allVideogames = useSelector((state) => state.allVideogames);
	const filterVideogames = useSelector((state) => state.filterVideogames);

	// Dispatch
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVideogames());
	}, [dispatch]);

	// Paginación
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 15;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems =
		filterVideogames.length >= 1
			? filterVideogames.slice(indexOfFirstItem, indexOfLastItem)
			: allVideogames.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<section className="home">
			<Filters setCurrentPage={setCurrentPage} />
			<ApiCards data={currentItems} />
			<Pagination
				totalItems={
					filterVideogames.length >= 1
						? filterVideogames.length
						: allVideogames.length
				}
				itemsPerPage={itemsPerPage}
				onPageChange={paginate}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</section>
	);
}
