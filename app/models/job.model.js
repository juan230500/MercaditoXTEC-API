module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define('job', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING

        },
        requirements: {
            type: Sequelize.STRING
        },
        salary: {
            type: Sequelize.STRING
        },
        position: {
            type: Sequelize.STRING
        },


    });

    return Job;
}