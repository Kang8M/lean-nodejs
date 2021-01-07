var db = require('../../db');
var controllerName = 'pets'

exports.show = function(req, res){
  var pet = getPetById(req.params.pet_id);
  if (!pet) return redirect('404');
  
  res.render(controllerName + '/show', { pet: pet });
};

exports.edit = function(req, res){
  var pet = getPetById(req.params.pet_id);
  if (!pet) return redirect('404');

  res.render(controllerName + '/edit', { pet: pet });
};

exports.update = function(req, res){
  var body = req.body;
  req.pet.name = body.pet.name;
  // res.message('Information updated!');
  res.redirect('/pets/' + req.pet.id);
};

function getPetById(id) {
  return db.pets[id];
}