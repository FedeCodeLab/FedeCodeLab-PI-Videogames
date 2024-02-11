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
			plataforms: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
			},
			releaseDate: {
				type: DataTypes.DATE,
			},
			rating: {
				type: DataTypes.ENUM("1", "2", "3", "4", "5"),
			},
		},
		{
			timestamps: false,
		}
	);
};
