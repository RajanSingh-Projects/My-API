var express = require('express'),
   mongoose = require('mongoose'),
   bodyParser = require('body-parser'),
   url = require('url'),
   exec = require("child_process").exec;

var db = mongoose.connect('mongodb://localhost:27017/deepAPI');
var deepmodels = require('./models/deepmodels');
var app = express();
var port = 3000; //process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Populating database with single document
/*var mymodel = deepmodels( {
  Model_Name : "my-mnist",
  Author : "Rajan",
  inputfield : "url",
  description : "This will predict the value of handwritten digits given the image url"
});

mymodel.save(function(err){
  if (err) throw err;
  console.log('model saved with no error')
});

deepmodels.find({}, function(err, models){
  if (err) throw err;
  console.log(models);
  return models;
}); */
/*deepmodels.remove({}, function(err){
  if(err) {
    console.log(err);
  }
  console.log('succesfully deleted');
}); */
deepmodels.find({}, function(err,models){
  if (!err) {
    console.log(models);
  }
});
/*deepmodels.remove({"Model_Name" : "new-mnist"}, function(error){
  if (error) throw error;
  console.log("Models deleted")
}); */

/*deepmodels.find({}, function(err, models){
  if (err) throw err;
  console.log(models);
}); */

//Creating Router for Http requests
var modelrouter = require('./routes/deeproute')(deepmodels);






/*ModelRouter.route('/')
  .post(function(req, res){
    var model = new deep(req.body);

    model.save();
    res.status(201).send(model)
  })
  .get(function(req, res){
    var query = {};
    if(req.query.Title)
    {
      query.Title = req.query.Title;
    }
   deep.find(query, function(err, deepmodel){
     if(err) {
       res.status(500).send(err);
     }
     else {
      res.json(deepmodel);
    }
  });
  });

  ModelRouter.route('/deepmodels/:Title')
    .get(function(req, res){
      var query = {};
     deep.findByTitle(req.params.findByTitle, function(err, deepmodel){
       if(err) {
         res.status(500).send(err);
       }
       else {
        res.json(deepmodel);
      }
    });
    });
*/
app.use('/api/deepmodels', modelrouter);
app.get('/', function(req, res){
  res.send('welcome to my API');
});

app.listen(port, function(){
  console.log('Running on PORT: ' + port);
});
