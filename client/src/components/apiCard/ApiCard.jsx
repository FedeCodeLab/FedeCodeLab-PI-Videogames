import { Link } from "react-router-dom";
import "../card/CardModules.css";

export default function ApiCard({ name, image, rating, id }) {
	return (
		<Link to={`/detail/${id}`}>
			<article className="card">
				<div className="card-top">
					<img src={image} alt="" />
				</div>
				<div className="card-bottom">
					<h1>{name}</h1>
					<p>
						<span className="blue">Rating: </span>
						{rating}⭐
					</p>
				</div>
			</article>
		</Link>
	);
}
