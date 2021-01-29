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
        eval: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },
        data: {
            type: Sequelize.BLOB('long')
        },
        typeSolution: {
            type: Sequelize.STRING
        },
        nameSolution: {
            type: Sequelize.STRING
        },
        dataSolution: {
            type: Sequelize.BLOB('long')
        }
    });

    return Practice;
}