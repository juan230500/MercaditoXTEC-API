module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define('chat', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client: {
            type: Sequelize.STRING
        },
        seller: {
            type: Sequelize.STRING
        },
        itemId: {
            type: Sequelize.STRING
        },
        type:{
            type:Sequelize.STRING
        }
    });

    return Chat;
}