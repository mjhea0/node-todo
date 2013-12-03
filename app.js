// dependencies
var express = require('express');
var routes = require('./routes'); 
var http = require('http');
var flash = require('connect-flash');
var path = require("path");

// config
var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 1337);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.cookieParser('cat_in_the_hat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.logger());
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
    res.redirect('/todos');
});

// mongo config
mongoose = require('mongoose');
db = mongoose.connect('mongodb://localhost/todo');
ToDo = require('./models.js').ToDo(db);

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/todos', routes.listTodo)
app.post('/todos/:description/new', routes.newTodo)
app.post('/todos/:id/save', routes.saveTodo)
app.post('/todos/:id/priority_up', routes.rateUp)
app.post('/todos/:id/priority_down', routes.rateDown)
app.post('/todos/:id/delete', routes.delete)

// run server
http.createServer(app).listen(app.get('port'), function(){
  console.log('\nExpress server listening on port ' + app.get('port'));
});
