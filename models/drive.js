var mongoose=require('mongoose');

var driveSchema = new mongoose.Schema({
   dTitle: String,
   dbanner: String,
   dvenue: String,
   dvenueImage:String,
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
    },
    comments:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Comment"
            }
        ],
    volunteers:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Volunteer"
            }
        ]
});

module.exports=mongoose.model("Drive", driveSchema);