module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('order', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        itemId: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING

        },
        status: {
            type: Sequelize.STRING
        },
        client:{
            type: Sequelize.STRING
        },
        seller:{
            type: Sequelize.STRING
        }

    });

    return Order;
}