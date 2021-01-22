 var express = require('express');
 
 const logger = require('./Middleware/logger');
 const exphbs = require('express-handlebars');
 const path = require('path');
 const members = require('./Members');


 var app = express();

 //handlebars Middlewars
 
 app.engine('handlebars', exphbs({defaultLayout:"main"}));
 app.set('view engine', 'handlebars');
 
 app.use(express.json())
 app.use(express.urlencoded({extended:false}))

 app.get('/',(req,res)=>res.render('index',{
     title:"Member app",
     members
 }))


 app.use(express.static(path.join(__dirname,"public")));

 app.use('/api/members', require('./routes/API/Members'))

 const PORT = process.env.PORT || 5000;

 app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
