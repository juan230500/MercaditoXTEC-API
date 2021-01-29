module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define('service', {

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
        description: {
            type: Sequelize.STRING

        },
        paymentInfo: {
            type: Sequelize.STRING
        },
        deliveryInfo: {
            type: Sequelize.STRING
        },
        eval: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },


    });

    return Service;
}