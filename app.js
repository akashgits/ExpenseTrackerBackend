const express =require('express');
const app=express();
const fs=require('fs');
//const https=require('https');

const bodyparser=require('body-parser');
const sequelize=require('./util/database');
//const Sequelize=require('sequelize');
const adminRoutes=require('./routes/admin');
const ExpenseRoutes=require('./routes/expense')
const Expense=require('./models/Expenses');
const User=require('./models/User');
const Orders=require('./models/orders')
const ForgotPassword=require('./models/forgetPassword')
const PurchaseRoutes=require('./routes/purchsasePremium')
const forgetRoutes=require('./routes/forgetPassword')

const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();


const DownloadList = require('./models/DownloadList');

const helmet=require('helmet');
const compression=require('compression')
const morgan=require('morgan');
const { patch } = require('./routes/admin');
const path = require('path');
const { join } = require('path');


app.use(bodyparser.urlencoded({extended:false}));
const accesslogs=fs.createWriteStream(path.join(__dirname,'accesslogs'),{flags:'a'});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accesslogs}))


app.use(adminRoutes);
app.use(forgetRoutes);
app.use(PurchaseRoutes)
app.use(ExpenseRoutes);



app.get('/',(req,res,next)=>{
    res.send('not now')
})
app.use((req,res,next)=>{
    res.send('error page')
});



Expense.belongsTo(User);
User.hasMany(Expense);

Orders.belongsTo(User);
User.hasMany(Orders);

ForgotPassword.belongsTo(User);
User.hasMany(ForgotPassword);

DownloadList.belongsTo(User);
User.hasMany(DownloadList);


sequelize.
sync().
//sync({force:true}).
then(response=>{
    app.listen(5555);
    

}).catch(err=>{
    console.log('err')
})


