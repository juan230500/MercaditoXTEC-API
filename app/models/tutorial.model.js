module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define('tutorial', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        curse: {
            type: Sequelize.STRING
        },
        schedule: {
            type: Sequelize.STRING
        },
        topics: {
            type: Sequelize.STRING
        },
        eval: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        },


    });

    return Tutorial;
}