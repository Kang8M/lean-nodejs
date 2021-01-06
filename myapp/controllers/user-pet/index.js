var db = require('../../db');

exports.create = function(req, res){
  var id = req.params.user_id;
  var user = db.users[id];
  var body = req.body;
  var pet = { name: body.pet.name };
  pet.id = db.pets.push(pet) - 1;
  user.pets.push(pet);
  // res.message('Added pet ' + body.pet.name);
  res.redirect('/users/' + id);
};