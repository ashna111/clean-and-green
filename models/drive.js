var mongoose=require('mongoose');

var driveSchema = new mongoose.Schema({
   dTitle: String,
   dbanner: String,
   dvenue: String,
   dContent: String,
   dLocation: String,
   dDate: Date
});

module.exports=mongoose.model("Drive", driveSchema);