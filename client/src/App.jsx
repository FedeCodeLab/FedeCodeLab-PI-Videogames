import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Header from "./components/header/Header";
import Create from "./views/create/Create";
import Detail from "./views/detail/Detail";
import Footer from "./components/footer/Footer";
const EMAIL = "f@f.com";
const PASSWORD = "hola123";

function App() {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	// ! --------------------------------------------------- Login

	const [access, setAccess] = useState(false);
	const login = ({ email, password }) => {
		if (email === EMAIL && password === PASSWORD) {
			setAccess(true);
		}
	};
	useEffect(() => {
		const currentPath = pathname.toLowerCase();
		const isLogin = currentPath === "/";
		if (access && isLogin) {
			navigate("/home");
		} else if (!access && !isLogin) {
			navigate("/");
		}
	}, [access, pathname, navigate]);

	// ! --------------------------------------------------- Exit

	const exit = () => {
		setAccess(!access);
	};

	// ! --------------------------------------------------- Return

	return (
		<div className="App">
			{pathname !== "/" && <Header exit={exit} />}
			<main>
				<Routes>
					<Route path="/" element={<Login login={login} />} />
					<Route path="/home" element={<Home />} />
					<Route path="/create" element={<Create />} />
					<Route path="/detail/:id" element={<Detail />} />
				</Routes>
			</main>
			{pathname !== "/" && <Footer />}
		</div>
	);
}

export default App;
