var express = require("express");
var path = require('path');

var app = express();
app.use(express.bodyParser());
require('./routes/')(app);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));

app.listen(8000);