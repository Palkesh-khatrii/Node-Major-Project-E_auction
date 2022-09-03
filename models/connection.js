//Express-Mongodb connectivity

var mongoose = require('mongoose')
var url = "mongodb://localhost:27017/training"
mongoose.connect(url)
var db=mongoose.connection
console.log("sucessfully connected to mongodb......")
module.exports=db