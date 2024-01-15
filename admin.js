const Express=require("express")
const Bodyparser=require("body-parser")
const Cors=require("cors")
const Mongoose=require("mongoose")
const adminModel = require("./adminModel/adminModel");

var admin=Express()


admin.use(Cors())
admin.use(Bodyparser.json())
admin.use(Bodyparser.urlencoded({extended:true}))


Mongoose.connect("mongodb+srv://athiraanil:athira@cluster0.akmt4eq.mongodb.net/examdb?retryWrites=true&w=majority",{useNewUrlParser:true})



admin.get("/",(req,res)=>{

    res.send("welcome to admin login")
})



admin.post("/adminlogin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await adminModel.findOne({ email, password });

      if (user) {
          res.json({ success: true, message: "Login successful", userData: user });
      } else {
          res.json({ success: false, message: "Login failed. User not found." });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


admin.post("/studentlogin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await adminModel.findOne({ email, password });

        if (user) {
            // Successful login
            res.status(200).json({ message: 'Login successful', user });
        } else {
            // Invalid credentials
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        // Internal Server Error
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



const PORT = process.env.PORT || 3000;
admin.listen(PORT, () => {
console.log("Server is running on port 3000");
});