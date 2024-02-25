import "./headerMobileModule.css";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

export default function HeaderMobileModule({ exit }) {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(toggleSidebar());
	};

	return (
		<div className="header-mobile">
			<div className="container flex-row">
				<div className="nav-left">
					<i className="fa-solid fa-bars" onClick={handleClick}></i>
				</div>
				<div className="nav-center">
					<Link to="/home">
						<h2>Videogames</h2>
					</Link>
				</div>
				<div className="nav-right">
					<button onClick={exit}>
						<i className="fa-solid fa-right-from-bracket" id="logout"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
