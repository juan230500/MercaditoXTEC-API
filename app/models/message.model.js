module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        createdBy: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.STRING
        }
        
    });

    return Message;
}