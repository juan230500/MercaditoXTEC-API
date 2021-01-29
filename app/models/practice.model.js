module.exports = (sequelize, Sequelize) => {
    const Practice = sequelize.define('practice', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        curse: {
            type: Sequelize.STRING
        },
        paymentInfo: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        },
        topics: {
            type: Sequelize.STRING
        },
        paidOut: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB('long')
        }
    });

    return Practice;
}