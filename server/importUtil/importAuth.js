var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream('/home/sravan/Desktop/Sem-3/Adaptive-Web/Project/StudyGenie/server/csvFiles/auth.csv');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/mern-starter');
var db = mongoose.connection;

//read in CSV as stream row by row
csv.fromStream(stream, {headers:true})
    .on('data', function(data){
    var job = new auth(data);
      job.save(function (err) {
        if (err) 
          console.log(err);
      });
    })
    .on('end', function(){
      console.log('done');
    });

const authSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: [3,"Min. of 3 characters are required"],
    max: [10,"Max. of 10 characters are allowed"]
  }
});

var auth = mongoose.model('auth', authSchema)
// var auth = require('../models/auth.js')