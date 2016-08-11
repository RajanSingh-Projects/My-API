var express = require('express');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
var  url = require('url');
var routes = function(deepmodels)
{
  var modelrouter = express.Router();
  //modelrouter.route('/')
/*  modelrouter.use('/:model/:inputs', function(req,res,next){
    deepmodels.find({Model_Name:req.params.model}, function(err,deepmodels){
      if(err){
          res.status(500).send(err);
      }
      else {
        next();
      }
    });
  }); */


    modelrouter.route('/result')
    .get(function(req, res){
      /* var modelname = req.params.model,
          inputvalue = req.params.inputs; */
    var get_params = url.parse(req.url,true).query,
        query = {Model_Name : get_params.model};
    deepmodels.find(query, function(err, models){
       if (err){
         console.log(err);
         res.status('400').send('Bad request')
       }
       var inputfield = models[0].inputfield;
       var inputvalue = get_params.input;
       modelname = models[0].Model_Name;
       var cwd = 'export DOCKER_HOST=tcp://192.168.122.253:2375 && docker run -e ' + inputfield + '=' + inputvalue + ' ' + modelname;
       exec(cwd, function(error, stdout, stderr){
         if(error) {
           res.send('400').send('Something wrong with your inputs');
         }
           else {
             res.send(stdout);
           }
       });
   });
 });
  modelrouter.route('/submit')
  .post(function(req, res){
    var postmodel = new deepmodels(req.body);
    var source_url = postmodel.Source;
    postmodel.save();
    res.status(201).send("Your model has been saved succesfully in our servers and will be available to be used in a few time.. Thanks");

   var cwdModel = 'git clone ' + source_url + ' Model && ';
   var cwdDocker = 'export DOCKER_HOST=tcp://192.168.122.253:2375 && docker build -t ' + req.body.Model_Name + ' . && ' + 'rm -rf Model';
   var cwd = cwdModel + cwdDocker;

    exec(cwd, function(error, stdout, stderr){
      if(error) {
        console.log(error);
      }
        else {
          console.log(stdout);
        }
    });
  });
/*  .get(function(req, res){
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

  modelrouter.route('/:Title')
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
  }); */
return modelrouter;
};
module.exports = routes;
