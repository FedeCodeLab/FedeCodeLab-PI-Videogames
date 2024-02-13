import "./FormModules.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import validation from "./validation";

export default function Form({ login }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const { value, name } = event.target;
		setUserData({ ...userData, [name]: value });
		setErrors(validation({ ...userData, [name]: value }));
	};

	function handleSubmit(e) {
		e.preventDefault();
		login(userData);
	}

	return (
		<form className="formLogin" onSubmit={handleSubmit}>
			<div className="email">
				<label className="blue">INICIA SESIÓN CON TU CORREO</label>
				<input
					type="email"
					name="email"
					key="email"
					placeholder="Invernalia@gmail.com"
					value={userData.email}
					onChange={handleChange}
				/>
				{errors.email && <p className="error">{errors.email}</p>}
			</div>
			<div className="password">
				<label className="gray">CONTRASEÑA</label>
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					key="password"
					placeholder="Ingresa tu contraseña"
					value={userData.password}
					onChange={handleChange}
				/>
				{errors.password && <p className="error">{errors.password}</p>}

				<div className="show-content">
					<div className="show" onClick={togglePasswordVisibility}>
						<p onClick={togglePasswordVisibility}>{showPassword ? "✓" : ""}</p>
					</div>
					<p className="small gray">Mostrar contraseña</p>
				</div>
			</div>
			<button type="submit">Iniciar Sesión</button>
		</form>
	);
}
