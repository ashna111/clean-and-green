var mongoose=require('mongoose');

var blogSchema = new mongoose.Schema({
    bTitle: String,
    bImage: String,
    bContent: String,
    bDate: { type: Date, default: Date.now },
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    }
});

module.exports=mongoose.model("Blog",blogSchema);