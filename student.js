const Express = require("express");
const Bodyparser = require("body-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");
const studentModel = require("./studentModel/studentModel");

var student = Express();

student.use(Cors());
student.use(Bodyparser.json());
student.use(Bodyparser.urlencoded({ extended: true }));

Mongoose.connect("mongodb+srv://athiraanil:athira@cluster0.akmt4eq.mongodb.net/examdb?retryWrites=true&w=majority", { useNewUrlParser: true })


      student.get("/", (req, res) => {
        res.send("Welcome to the exam app");
      });

      student.post("/addstudent", async (req, res) => {
        let data = new studentModel(req.body);
        console.log(data);
        await data.save();
        res.send(data);
      });

      student.get("/viewall", async (req, res) => {
        let data = await studentModel.find();
        res.send(data);
      });

      
      student.post("/login", async (req, res) => {
        const { regid } = req.body;
      
        try {
          const student = await studentModel.findOne({ regid });
      
          console.log("Found student:", student);
      
          if (!student) {
            console.log("Student not found");
            return res.status(404).json({ message: "Student not found" });
          }
      
          if (student.eligibility === 1) {
            console.log("Allowing exit exam for eligible student", student.eligibility);
            return res.status(200).json({ allowExit: true });
          } else {
            console.log("Student not eligible.", student.eligibility);
            return res.status(403).json({ allowExit: false });
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Server error" });
        }
      });
      
      
      

      student.listen(3900);
