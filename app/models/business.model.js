module.exports = (sequelize, Sequelize) => {
    const Business = sequelize.define('business', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        email: {
            type: Sequelize.STRING,
            
        },
        name: {
            type: Sequelize.STRING
        },
        companyName: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        companyPhone: {
            type: Sequelize.STRING
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        tokens: {
            type: Sequelize.ARRAY(Sequelize.TEXT)

        }
    });

    return Business;
}