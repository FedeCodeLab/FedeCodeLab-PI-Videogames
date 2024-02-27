const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"Videogame",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
			},
			background_image: {
				type: DataTypes.STRING,
			},
			background_image_additional: {
				type: DataTypes.STRING,
			},
			release_date: {
				type: DataTypes.DATEONLY,
			},
			rating: {
				type: DataTypes.DECIMAL(3, 2),
				validate: {
					min: 1,
					max: 5,
				},
			},
		},
		{
			timestamps: false,
		}
	);
};
