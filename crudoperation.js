/* const express = require('express')
const server = express()
const port = 3000
const router = express.Router()
require('dotenv').config()




let students = []

server.use(express.json());
server.use('/api' , router)

server.post('/post' , (req , res)=>{
    const name = req.body.name;
    const studentid = req.body.id;
    const student = {id : studentid , name : name}
    students.push(student)
    res.json(student)

})

server.get('/get/:id', (req , res)=>{
    const id = parseInt(req.params.id)
    const specificstudent = students.find(s => s.id === id)
    res.json(specificstudent)
})

server.put('/put/:id' , (req , res)=>{
    const id = parseInt(req.params.id)
    const Studentindex = students.findIndex(s => s.id === id)
    const updatedstudent = {id: id , ...req.body}
    students[Studentindex] = updatedstudent
    res.json(updatedstudent)
})

server.patch('patch/:id' , (req , res)=>{
    const id = parseInt(req.params.id)
    const Studentindex = students.findIndex(s => s.id === id)
    const ptch = students[Studentindex]
    students.splice(Studentindex , 1 , {...ptch , ...req.body})
    
})

server.delete('/delete/:id' , (req , res)=>{
    const id = parseInt(req.params.id)
    const Studentindex = students.findIndex(s => s.id === id)
    students.splice(Studentindex , 1)
})

server.listen(port , ()=>{
    console.log("Server is running on port 3000")
}) */