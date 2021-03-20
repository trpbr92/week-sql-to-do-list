const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const router = require('./routes/list.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//ROUTES
app.use('/list', router)

app.listen(port,()=>{
    console.log('listening on port:', port);
});