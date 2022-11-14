let express = require('express');
let dotenv = require('dotenv');
dotenv.config();
let cors = require('cors');
const bodyParser = require('body-parser');
let app = express();
let Sequelize = require('./util/database');
let userRoutes = require('./routes/users');
app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use('/users',userRoutes);

Sequelize.sync().then(res =>{
    console.log("Server Synced");
    app.listen(5000);
}).catch(err => console.log(err));


