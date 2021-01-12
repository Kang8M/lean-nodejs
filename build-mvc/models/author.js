var mongoose = require('mongoose')
var Schema = mongoose.Schema

var authorSchema = Schema({
  first_name: {type: String, required: true, maxlength: 100},
  family_name: {type: String, required: true, maxlength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
})

authorSchema.virtual('name').get(() => {
  return this.family_name + ', ' + this.first_name
})

authorSchema.virtual('lifespan').get(() => {
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
})

authorSchema.virtual('url').get(() => {
  return '/catalog/author/' + this._id
})

module.exports = mongoose.model('Author', authorSchema);