const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/university",{useNewUrlParser: true})

const studentSchema = new Schema({
    name: String,
    age: Number,
    subject: String
},
{
    versionKey: false
}
)

const Student = mongoose.model("Student",studentSchema);


const server=express()


// Get API 
server.get("/students",async(req,res)=>{
    const data= await Student.find({},{_id:0})
    res.status(200).send({
        status: 'success',
        data:data
    })

})


// POST API
server.post("/students",async(req,res)=>{
    const data = new Student({name:req.query.name,age:req.query.age,subject:req.query.subject});
    data.save().then((data) => {
        res.status(201).send(data);
    }).catch((error) => {
        res.status(400).send(error);
    })
})


server.listen(8090,()=>{
    console.log('listening on port');
})