const Express=require("express")
const Bodyparser=require("body-parser")
const Cors=require("cors")
const Mongoose=require("mongoose")
const examModel = require("./examModel/examModel")


var exam=Express()

exam.use(Cors())
exam.use(Bodyparser.json())
exam.use(Bodyparser.urlencoded({extended:true}))


Mongoose.connect("mongodb+srv://athiraanil:athira@cluster0.akmt4eq.mongodb.net/examdb?retryWrites=true&w=majority",{useNewUrlParser:true})


const db = Mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});



exam.get("/",(req,res)=>{

    res.send("welcome to exam app")
})


exam.post("/login",async(req,res)=>{
    let data=new examModel(req.body)
    console.log(data)
    await data.save()



    res.send(data)
})
 exam.listen(4000)