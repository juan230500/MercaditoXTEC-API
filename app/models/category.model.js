

module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define('categories', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  label: {
			type: Sequelize.STRING
	  },
	  value: {
			type: Sequelize.STRING
	  }
	});
	
	return Category;
}