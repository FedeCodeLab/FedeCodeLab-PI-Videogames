export const validation = ({
	name,
	description,
	background_image,
	background_image_additional,
	releaseDate,
	rating,
	genres,
	platforms,
}) => {
	const errors = {};

	// ? -------------------------------------------------------------------- name

	if (!name) {
		errors.name = "Este campo no puede estar vacío";
	}
	if (name.length > 30) {
		errors.name = "El nombre del juego no puede superar los 30 caracteres";
	}
	if (name && !/^[A-Za-z0-9\s]+$/g.test(name)) {
		errors.name = "El nombre del juego no puede contener carácteres especiales";
	}
	// ? -------------------------------------------------------------------- description

	if (!description) {
		errors.description = "Este campo no puede estar vacío";
	}

	if (description.length < 100) {
		errors.description =
			"La descripción debe contener como minimo 100 caracteres";
	}

	// ? -------------------------------------------------------------------- images

	if (!background_image) {
		errors.background_image = "Este campo no puede estar vacío";
	}

	if (!background_image_additional) {
		errors.background_image_additional = "Este campo no puede estar vacío";
	}

	// ? --------------------------------------------------------------------- rating

	if (!rating) {
		errors.rating = "Este campo no puede estar vacío";
	}

	if (rating < 1) {
		errors.rating = "El rating no puede ser menor a 1";
	} else if (rating > 5.0) {
		errors.rating = "El rating no puede ser mayor a 5";
	}

	// ? --------------------------------------------------------------------- genres

	// if (!genres) {
	// 	errors.genres = "Este campo no puede estar vació";
	// }

	// if (genres <= 0) {
	// 	errors.genres = "Debes agregar al menos un genero a la lista";
	// }

	if (!genres) {
		errors.genres = "Este campo no puede estar vacío";
	} else if (genres.length === 0) {
		errors.genres = "Debes agregar al menos un género a la lista";
	}
	// ? --------------------------------------------------------------------- platform

	if (!platforms) {
		errors.platforms = "Este campo no puede estar vació";
	}

	if (platforms <= 0) {
		errors.platforms = "Debes agregar al menos una plataforma a la lista";
	}

	// ? --------------------------------------------------------------------- releaseDate

	if (
		(releaseDate >= "0000-00-00" && releaseDate < "1950-00-00") ||
		releaseDate > "2030-00-00"
	) {
		errors.releaseDate = "Debes colocar una fecha correcta";
	}

	return errors;
};
