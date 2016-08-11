var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var deepmodels = new Schema({
  Model_Name : {type : String},
  Source :{type : String},
  Author : {type : String},
  inputfield : {type : String},
  description : {type: String}
});

module.exports = mongoose.model('deepmodels', deepmodels);
