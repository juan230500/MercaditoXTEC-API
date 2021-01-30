

module.exports = (sequelize, Sequelize) => {
	const Admin = sequelize.define('admin', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
      address: {
			type: Sequelize.STRING
	  },
	  
	  name: {
			type: Sequelize.STRING
	  },
	  password: {
			type: Sequelize.STRING
    },
      phone: {
        type: Sequelize.STRING
    },
    tokens: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
        
    }
	});
	
	return Admin;
}