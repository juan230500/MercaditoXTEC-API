

module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  name: {
			type: Sequelize.STRING
	  },
	  price: {
			type: Sequelize.STRING
  	},
	  category: {
			type: Sequelize.STRING
	  },
	  paymentInfo: {
			type: Sequelize.INTEGER
    },
    deliveryInfo: {
        type: Sequelize.INTEGER
    },
    eval: {
        type: Sequelize.INTEGER,
        defaultValue: '0'
    },
    // ownerEmail: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     references: {         // User belongsTo Company 1:1
    //       model: 'user',
    //       key: 'email'
    //     }
    // },
    
	});
	
	return Product;
}