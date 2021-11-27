require('dotenv').config();

const express = require('express');
const app = express();
const pool = require("./db");
const cors = require("cors");
const e = require('express');
const https = require('https');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/validate');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*
This is a comment for testing if the server can see if there is any changes to the github repo
*/

//Routes
app.get("/login", async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.redirect(301, "https://auth.dtu.dk/dtu/?service=http://localhost:5000/redirect");
})


app.get("/redirect", async(req, res) => {
    console.log(req.query.ticket);
    try {
        axios.get("https://auth.dtu.dk/dtu/validate?service=http://localhost:5000/redirect", {
            params: {
                ticket: req.query.ticket
            }
        }).then((response) => {
            var str = response.data.split('\n');
            if(str[0] === 'yes') {
                const token = jwt.sign(
                    {studentnumber: str[1]},
                    process.env.JWT_TOKEN,
                    {
                        expiresIn: "2h"
                    }
                )
                console.log(token);
                return res.redirect("http://localhost:3000/?token=" + token)
            }

            
        });
    } catch (error) {
        //TODO: Do proper error
        console.log("error in redirect");
    }
})


app.get("/testAPI", auth, (req, res) => {
    res.status(200).send("Test succesful");
})

// Courses
//Get All
app.get("/allCourses",  async (req,res) => {
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
//get days for one coures
app.get("/getDaysForCourse/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const getDays = await pool.query(`SELECT * FROM days WHERE courseid = ${id} ORDER BY dayid`);
        res.json(getDays.rows);
    } catch (error) {
        console.error(error.message);
    }
})
//create day for course
app.post("/CreateDay", async (req,res) => {
    try {
        console.log("/CreateDay has been reached")
        const {name} = req.body;
        const {courseid} = req.body;
        //var data = JSON.parse(req.body);
        const createDay = await pool.query(`INSERT INTO days (name,courseid) VALUES('${name}',${courseid});`);
        res.json(createDay);
    } catch (error) {
        console.error(error.message);
    }
})
//delete day
app.delete("/deleteDay/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        await pool.query(`DELETE FROM days WHERE dayid = ${id}`);
        res.json("Object was deleted!");
    } catch (error) {
        console.error(error,message);
    }
})

// Cards
// Get cardsfrom one day
app.get("/GetCardsFromdDay/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const getCards = await pool.query(`SELECT * FROM cards WHERE dayid = ${id}`);
        res.json(getCards.rows);
    } catch (error) {
        console.error(error.message);
    }
})
//create card
app.post("/CreateCard", async (req,res) => {
    try {
        const {desc} = req.body;
        const {title} = req.body;
        const {dayid} = req.body;
        const {username} = req.body;
        const createDay = await pool.query(`INSERT INTO cards ("desc","title","dayid","username") VALUES('${desc}','${title}',${dayid},'${username}');`);
        res.json(createDay);
    } catch (error) {
        console.error(error.message);
    }
})

app.put("/UpdateCardStatus", async (req,res) => {
    try {
        const {cardid} = req.body;
        const {status} = req.body;
        const updateStatus = await pool.query(`UPDATE cards SET status=${status} WHERE cardid = ${cardid}`);
        res.json(updateStatus);
    } catch (error) {
        console.error(error.message);
    }
})

// Comments
// Create comment for day
app.post("/CreateComment", async (req,res) =>{
    try {
        const {comment} = req.body;
        const {username} = req.body;
        const {cardid} = req.body;
        //var data = JSON.parse(req.body);
        const createDay = await pool.query(`INSERT INTO comments (comment,username,cardid) VALUES('${comment}','${username}',${cardid});`);
        res.json(createDay);
    } catch (error) {
        console.error(error.message);
    }
})
//get all comments for one card
app.get("/getCommentsForOneCard/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        const getCards = await pool.query(`SELECT * FROM comments WHERE cardid = ${id}`);
        res.json(getCards.rows);
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