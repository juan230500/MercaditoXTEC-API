

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {	
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
    points: {
      type: Sequelize.INTEGER,
      default: '0'
    },
    tokens: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
        
    }
	});
	
	return User;
}