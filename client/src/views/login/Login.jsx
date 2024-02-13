import "./LoginModules.css";
import Form from "../../components/formLogin/Form";

export default function Login({ login }) {
	return (
		<section className="login">
			<Form login={login} />
		</section>
	);
}
