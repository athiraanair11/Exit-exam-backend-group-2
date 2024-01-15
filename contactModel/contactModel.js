const Mongoose=require("mongoose")
let contactSchema=Mongoose.Schema(

    {
        name:String,
        email:String,
        content:String
    }
)

let contactModel=Mongoose.model("contact",contactSchema)
module.exports=contactModel