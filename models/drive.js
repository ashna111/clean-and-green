var mongoose=require('mongoose');

var driveSchema = new mongoose.Schema({
   dTitle: String,
   dbanner: String,
   dvenue: String,
   dContent: String,
   dGeoLocation: String,
   dLocality: String,
   dArea: String,
   dCity: String,
   dDate: Date,
   dOrganiser: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    }
});

module.exports=mongoose.model("Drive", driveSchema);