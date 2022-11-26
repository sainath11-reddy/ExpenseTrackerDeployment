let express = require('express');
let dotenv = require('dotenv');
dotenv.config();
const https = require('https')
let cors = require('cors');
const bodyParser = require('body-parser');
const helmet =require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
let app = express();

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');
let Sequelize = require('./util/database');
let userRoutes = require('./routes/users');
let payementRoutes = require('./routes/payments');
let expenseRoutes = require('./routes/expenses');
let expense = require('./models/expenses');
let user = require('./models/users');
let passwordRoutes = require('./routes/password');
const orderId = require('./models/orderId');
let passwordModel = require('./models/ForgotPasswordsRequests');
let fileURls = require('./models/fileURls');

// const accessLogStream = fs.WriteStream(path.join(__dirname, 'access.log'), {flags:'a'});



app.use(helmet({
    contentSecurityPolicy: false,
  }));
// app.use(morgan('combined',{stream:accessLogStream}) );
app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use('/api/payment',payementRoutes);
app.use('/password',passwordRoutes);
app.use('/users',userRoutes);
app.use('/expenses',expenseRoutes);
app.use((req,res)=>{
    console.log(req.url)
    res.sendFile(path.join(__dirname,`public/${req.url}`))
})
user.hasMany(expense);
expense.belongsTo(user);
user.hasMany(orderId);
orderId.belongsTo(user);
passwordModel.belongsTo(user);
user.hasMany(passwordModel);
fileURls.belongsTo(user);
user.hasMany(fileURls);
Sequelize.sync().then(res =>{
    console.log("Server Synced");
    console.log("Req successful");
    // https.createServer({key:privateKey, cert:certificate}, app).listen(5000);
    app.listen(5000);
}).catch(err => console.log(err));



