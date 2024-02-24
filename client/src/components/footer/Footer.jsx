import "./Footer.css";
import { Link } from "react-router-dom";

const linkedIn = "https://www.linkedin.com/in/fedecodelab/";
const github = "https://github.com/FedeCodeLab";
const PORFOLIO = "https://fedecodelab.tech/";

export default function Footer() {
	return (
		<footer>
			<div className="container">
				<p>Federico Guzman | PI Videogames</p>
				<p>federicoguzman@gmail.com</p>
				<div className="links">
					<Link to={`${github}`} target="_blank">
						<i className="fa-brands fa-github"></i>
					</Link>
					<Link to={`${linkedIn}`} target="_blank">
						<i className="fa-brands fa-linkedin"></i>
					</Link>
					<Link to={`${PORFOLIO}`} target="_blank">
						<i className="fa-solid fa-globe"></i>
					</Link>
				</div>
			</div>
		</footer>
	);
}
