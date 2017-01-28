module.exports = function(sequelize, DataTypes) {
	var Burger = sequelize.define("burgers", {
		burger_name: DataTypes.STRING,
		devoured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
	});
	return Burger;
};