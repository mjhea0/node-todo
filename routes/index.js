var path = require("path");

exports.index = function(req, res){
  res.render('index', { title: 'Your Tasks' });
};

exports.ping = function(req, res){
  res.send("pong!", 200);
};

// list todo
exports.listTodo = function(req, res){
  var query = ToDo.find({});
  query.sort({done : 1, priority : -1})
  query.exec(function(error, data) {
    res.render('index', {
      todos: data
    });
  });
};

// new todo
exports.newTodo = function(req, res) {
  if (req.params.description) {
    var create = new ToDo();
    create.description = req.params.description;
    create.save(function(){
      res.redirect('/todos');
    });
  };
};

//save todo
exports.saveTodo = function(req, res){
  ToDo.findOne({_id : req.params.id}, function(err, data) {
    if (!data) return next(new NotFound('Task not found'));
    if (req.body['done' + req.params.id] == 'on') {
      data.done = true;
    } else  {
      data.done = false;
    }
    data.modified = new Date();
    data.save(function(err) {
      res.redirect('/todos');
    });
  });
};

// delete todo
exports.delete = function(req, res){
  ToDo.remove({_id : req.params.id}, function(err, d){
    res.redirect('/todos');
  });
};

// rate up
exports.rateUp = function(req, res){
  ToDo.findOne({_id : req.params.id}, function(err, data) {
    if (!data) return next(new NotFound('Task not found'));
    var priority = data.priority;
    switch(data.priority) {
      case '0':
        data.priority = '1';
        break;
      case '1':
        data.priority = '2';
        break;
    };
    data.modified = new Date();
    data.save(function(err) {
      res.redirect('/todos');
    });
  });
};

// rate down
exports.rateDown = function(req, res){
  ToDo.findOne({_id : req.params.id}, function(err, data) {
    if (!data) return next(new NotFound('Task not found'));
    var priority = data.priority;
    switch(data.priority) {
      case '1':
        data.priority = '0';
        break;
      case '2':
        data.priority = '1';
        break;
    };
    data.save(function(err) {
      res.redirect('/todos');
    });
  });
};
