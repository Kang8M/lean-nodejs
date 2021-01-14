const { DateTime } = require('luxon')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var authorSchema = Schema({
  first_name: {type: String, required: true, maxlength: 100},
  family_name: {type: String, required: true, maxlength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
})

authorSchema.virtual('name').get(function() {
  return this.family_name + ', ' + this.first_name;
})

authorSchema.virtual('lifespan').get(function() {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
})

authorSchema.virtual('url').get(function() {
  return '/catalog/author/' + this._id;
})

authorSchema.virtual('fulldatebirthdeath').get(function() {
  let birth = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  let death = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  return birth + ' - ' + death;
})

module.exports = mongoose.model('Author', authorSchema);