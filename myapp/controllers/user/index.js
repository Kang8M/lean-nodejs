var db = require('../../db');
var controllerName = 'users'

exports.list = function(req, res){
  res.render(controllerName + '/list', { users: db.users });
};

exports.edit = function(req, res){
  var id = req.params.user_id
  if (!id) res.redirect('404')

  var user = getUserById(id)
  if (!user) res.redirect('404')

  res.render(controllerName + '/edit', { user: user });
};

exports.show = function(req, res){
  var id = req.params.user_id
  if (!id) res.redirect('404')

  var user = getUserById(id)
  if (!user) res.redirect('404')

  res.render(controllerName + '/show', { user: user });
};

exports.update = function(req, res){
  var body = req.body;
  var id = req.params.user_id;

  db.users[id].name = body.user.name;
  // res.message('Information updated!');
  res.redirect('/users/' + id);
};

function getUserById(id) {
  return db.users[id];
}