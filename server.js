

const express = require('express');
const app = express();
const http = require("http").Server(app);
const chalk = require('chalk');
const log = console.log;

// const message = require('../controllers/messages.controller.js');
const message = require('./app/controllers/messages.controller.js');



var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
}); 

let router = require('./app/routers/router.js');
let userRouter = require('./app/routers/user.router.js');
let productRouter = require('./app/routers/product.router.js');
let categoryRouter = require('./app/routers/category.router.js');
let ServiceRouter = require('./app/routers/service.router.js');
let TutorialRouter = require('./app/routers/tutorial.router.js');
let FileRouter = require('./app/routers/file.router.js');
let PracticeRouter = require('./app/routers/practice.router.js');
let MarketRouter = require('./app/routers/market.router.js');
let OrderRouter = require('./app/routers/order.router.js');
let ChatRouter = require('./app/routers/chat.router.js');
let MessageRouter = require('./app/routers/message.router.js');








const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/', router);
app.use('/', userRouter);
app.use("/",productRouter);
app.use("/",categoryRouter);
app.use("/",ServiceRouter);
app.use("/",TutorialRouter);
app.use("/",FileRouter);
app.use("/",PracticeRouter);
app.use("/",MarketRouter);
app.use("/",OrderRouter);
app.use("/",ChatRouter);
app.use("/",MessageRouter);

// SOCKET FOR CHAT IN REAL TIME






// Create a Server
const server = app.listen(3000, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

const io = require("socket.io")(server);


// io.on("connection", (socket) => {
//   log(chalk.bold.black.bgYellow("NEW USER CONNECTED TO SOCKET"));
//   socket.on("message", (data) => {
   
    
//     io.emit("chat"+data.id,data);
//     message.sendMessage(data);
//   });
// });
