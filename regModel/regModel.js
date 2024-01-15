const Mongoose=require("mongoose")

let regSchema=Mongoose.Schema(

    {
        name:String,
        email:String,
        batch:String,
        gender:String,
        mobilenum:String
        
    }
)

let regModel=Mongoose.model("reg",regSchema)
module.exports=regModel