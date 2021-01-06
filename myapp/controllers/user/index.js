var db = require('../../db');
var controllerName = 'users'

exports.before = function(req, res, next){
  var id = req.params.user_id;
  if (!id) return next();
  // pretend to query a database...
  process.nextTick(function(){
    req.user = db.users[id];
    // cant find that user
    if (!req.user) return next('route');
    // found it, move on to the routes
    next();
  });
};

exports.list = function(req, res){
  var id = req.params.user_id;
  if (!id) res.redirect('404')

  res.render(controllerName + '/list', { users: db.users });
};

exports.edit = function(req, res){
  res.render(controllerName + '/edit', { user: req.user });
};

exports.show = function(req, res){
  res.render(controllerName + '/show', { user: req.user });
};

exports.update = function(req, res){
  var body = req.body;
  req.user.name = body.user.name;
  // res.message('Information updated!');
  res.redirect('/users/' + req.user.id);
};

function getUserById(id) {
  return db.users[id];
}