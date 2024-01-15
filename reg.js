const Express=require("express")
const Bodyparser=require("body-parser")
const Cors=require("cors")
const Mongoose=require("mongoose")
const regModel = require("./regModel/regModel")


var reg=Express()

reg.use(Cors())
reg.use(Bodyparser.json())
reg.use(Bodyparser.urlencoded({extended:true}))


Mongoose.connect("mongodb+srv://athiraanil:athira@cluster0.akmt4eq.mongodb.net/examdb?retryWrites=true&w=majority",{useNewUrlParser:true})






reg.get("/",(req,res)=>{

    res.send("welcome to exam app")
})


// reg.post("/add",async(req,res)=>{
//     let data=new regModel(req.body)
//     console.log(data)
//     await data.save()



//     res.send(data)
// })


reg.get("/viewall",async(req,res)=>{

    let data=await regModel.find()
    res.send(data)
})



reg.post('/add', async (req, res) => {
    try {
        const { name, email, mobilenum, batch, gender } = req.body;

        // Check if required fields are provided
        if (!name || !email || !mobilenum || !batch || !gender) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Check if the email is a valid email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email address' });
        }

        // Check if the mobile number is a valid 10-digit number
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobilenum)) {
            return res.status(400).json({ success: false, message: 'Invalid mobile number' });
        }

        // Check if the email is already registered
        const data = await regModel.findOne({ email });

        if (data) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Continue with the registration process if the email is not registered
        const newdata = new regModel({ name, email, mobilenum, batch, gender });
        await newdata.save();

        res.status(201).json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});




reg.listen(3500)