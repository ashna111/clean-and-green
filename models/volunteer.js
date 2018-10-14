var mongoose=require("mongoose");

var volunteerSchema= mongoose.Schema({
    
    vol: {
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String,
        email:String
    }
}); 

module.exports= mongoose.model("Volunteer",volunteerSchema);