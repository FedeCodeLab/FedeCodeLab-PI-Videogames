import React, { useState } from "react";
import "./PaginationModules.css";

export default function Pagination({ totalItems, itemsPerPage, onPageChange }) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		onPageChange(page);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			onPageChange(currentPage + 1);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<li
					key={i}
					className={currentPage === i ? "active" : ""}
					onClick={() => handlePageChange(i)}
				>
					{i}
				</li>
			);
		}

		return pageNumbers;
	};

	return (
		<div className="pagination">
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 1}
				className={currentPage === 1 ? "is_disabled" : "text"}
			>
				Prev
			</button>
			<ul>{renderPageNumbers()}</ul>
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className={currentPage === totalPages ? "is_disabled" : "text"}
			>
				Next
			</button>
		</div>
	);
}
