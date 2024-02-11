import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Header from "./components/header/Header";

function App() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	return (
		<div className="App">
			{pathname !== "/" && <Header />}
			<main>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
