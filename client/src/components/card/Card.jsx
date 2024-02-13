import { Link } from "react-router-dom";
import "./CardModules.css";

export default function Card({ id, name, background_image, rating, genres }) {
	return (
		<div className="card">
			<Link to={`/detail/${id}`}>
				<article className="card">
					<div className="card-top">
						<img src={background_image} alt="" />
					</div>
					<div className="card-bottom">
						<h1>{name}</h1>
						<p>
							<span className="blue">Rating: </span>
							{rating}⭐
						</p>
						<p>Genres: {genres}</p>
					</div>
				</article>
			</Link>
		</div>
	);
}
