import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/actions/actions"; // Asegúrate de importar correctamente

import "./sideBarModule.css";

export default function SideBar() {
	const isVisible = useSelector((state) => state.sidebar.isVisible);
	const dispatch = useDispatch();

	const handleLinkClick = () => {
		// Oculta la barra lateral al hacer clic en un enlace
		dispatch(toggleSidebar(false));
	};

	return (
		<div className={`sideBar ${isVisible ? "visible" : ""}`}>
			<ul>
				<Link to="/home" onClick={handleLinkClick}>
					<li>Inicio</li>
				</Link>
				<Link to="./create" onClick={handleLinkClick}>
					<li>Crear Videojuego</li>
				</Link>
			</ul>
		</div>
	);
}
