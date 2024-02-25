import { Link } from "react-router-dom";
import "./CardModules.css";
import { smoothScrollToTop } from "../../functions/SmoothScroll";

export default function Card({ id, name, background_image, rating, genres }) {
	const handleClick = () => {
		smoothScrollToTop();
	};

	return (
		<Link to={`/detail/${id}`} onClick={handleClick}>
			<article className="card">
				<div className="card-top">
					<img src={background_image} alt="" />
				</div>
				<div className="card-bottom">
					<h3>{name}</h3>
					<div>
						<p>
							<span className="blue">Rating: </span>
							{rating}⭐
						</p>
						<p>
							<span className="blue">Géneros: </span>
							{genres}
						</p>
					</div>
				</div>
			</article>
		</Link>
	);
}
