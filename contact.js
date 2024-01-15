const Express=require("express")
const Bodyparser=require("body-parser")
const Cors=require("cors")
const Mongoose=require("mongoose")
const contactModel = require("./contactModel/contactModel")


var contact=Express()

contact.use(Cors())
contact.use(Bodyparser.json())
contact.use(Bodyparser.urlencoded({extended:true}))


Mongoose.connect("mongodb+srv://athiraanil:athira@cluster0.akmt4eq.mongodb.net/examdb?retryWrites=true&w=majority",{useNewUrlParser:true})



contact.get("/",(req,res)=>{

    res.send("welcome to exam app")
})


contact.post("/add",async(req,res)=>{
    let data=new contactModel(req.body)
    console.log(data)
    await data.save()



    res.send(data)
})

contact.get("/viewall",async(req,res)=>{

    let data=await contactModel.find()
    res.send(data)

})


contact.listen(3800)