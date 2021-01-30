
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
db.Service = require('../models/service.model.js')(sequelize, Sequelize);
db.Tutorial = require('../models/tutorial.model.js')(sequelize, Sequelize);
db.Practice = require('../models/practice.model.js')(sequelize, Sequelize);
db.Order = require('../models/order.model.js')(sequelize, Sequelize);
db.Chat = require('../models/chat.model.js')(sequelize, Sequelize);
db.Message = require('../models/message.model.js')(sequelize, Sequelize);
db.Admin = require('../models/admin.model.js')(sequelize, Sequelize);
db.Business = require('../models/business.model.js')(sequelize, Sequelize);
db.Job = require('../models/job.model.js')(sequelize, Sequelize);





db.files = require('../models/file.model.js')(sequelize, Sequelize);






// Relationship User -> Product
db.User.hasMany(db.Product);
db.Product.belongsTo(db.User);
 

// Relationship User -> Service
db.User.hasMany(db.Service);
db.Service.belongsTo(db.User);

// Relationship User -> Tutorial
db.User.hasMany(db.Tutorial);
db.Tutorial.belongsTo(db.User);

// Relationship User -> Practica
db.User.hasMany(db.Practice);
db.Practice.belongsTo(db.User);


// Relationship Order -> Chat
db.Order.hasOne(db.Chat);
db.Chat.belongsTo(db.Order);

// Relationship Chat -> Message
db.Chat.hasMany(db.Message);
db.Message.belongsTo(db.Chat);


module.exports = db;