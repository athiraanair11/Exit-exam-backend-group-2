const Mongoose=require("mongoose")
let studentSchema=Mongoose.Schema(

    {
        regid:String,
        name:String,
        batch:String,
        a1:String,
        a2:String,
        a3:String,
        cs1:String,
        cs2:String,
        project:String,
        eligibility:Number

    }
)

let studentModel=Mongoose.model("students",studentSchema)
module.exports=studentModel

