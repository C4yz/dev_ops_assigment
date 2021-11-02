const express = require('express');
const app = express();
const pool = require("./db");
const cors = require("cors");
const e = require('express');

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

//Routes

// Courses
//Get All
app.get("/allCourses", async (req,res) => {
    try {
        const getAll = await pool.query("SELECT * FROM courses");
        res.json(getAll.rows);
    } catch (error) {
        
    }
})

//Get One
app.get("/getOneCourse/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const getOne = await pool.query(`SELECT * FROM courses WHERE courseId = ${id}`);
        res.json(getOne.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//Create
app.post("/createCourse", async (req,res) =>{
    try {
        const {courseId} = req.body;
        const {name} = req.body;
        const {number} = req.body;
        const newObj = await pool.query(`INSERT INTO courses (courseId,name,number) VALUES(${courseId},'${name}',${number})`);
        res.json(newObj);
    } catch (error) {
        console.error(error.message);
    }
})

//Update
app.put("/updateCourse/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const updateObj = await pool.query(`UPDATE courses SET number = '65282' WHERE courseId = ${id}`);
        res.json(updateObj)
    } catch (error) {
        console.error(error.message);
    }
})

//Delete
app.delete("/deleteCourse/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const delPerson = await pool.query(`DELETE FROM courses WHERE courseId = ${id}`);
        res.json("Object was deleted!");
    } catch (error) {
        console.error(error.message);
    }
})

// Days

app.get("/getDaysForCourse/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const getDays = await pool.query(`SELECT * FROM days WHERE pCourseId = ${id}`);
        res.json(getDays.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.post("/CreateDay", async (req,res) => {
    try {
        //const {name} = req.body;
        //const {pCourseId} = req.body;
        var data = JSON.parse(req.body);
        const createDay = await pool.query(`INSERT INTO days (name,courseid) VALUES(`+data.name+`,`+data.courseid+`);`);
        res.json(createDay);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
});

app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});