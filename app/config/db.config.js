/**
 * Copyright by https://loizenai.com
 * youtube loizenai
 */

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.User = require('../models/user.model.js')(sequelize, Sequelize);
db.Product = require('../models/product.model.js')(sequelize, Sequelize);
db.Category = require('../models/category.model.js')(sequelize, Sequelize);



// Relationships
db.User.hasMany(db.Product);
db.Product.belongsTo(db.User);
 
module.exports = db;