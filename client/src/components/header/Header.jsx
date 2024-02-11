import "./HeaderModules.css";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<div className="nav-list">
				<div className="nav-left">
					<Link to="/home">
						<h1>Countries</h1>
					</Link>
				</div>
				<div className="nav-right">
					<Link to="/home">
						<p>Home</p>
					</Link>
					<Link to="/about">
						<p>About Me</p>
					</Link>
					<Link to="../activities">
						<p>Create Activity</p>
					</Link>
					<button onClick={exit}>
						<i
							className="fa-solid fa-right-from-bracket log-out"
							id="logout"
						></i>
					</button>
				</div>
			</div>
		</header>
	);
}
