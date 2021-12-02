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
const logger = require('./logger/logger');

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
        }).then(async (response) => {
            let token;
            let role;
            var str = response.data.split('\n');
            if(str[0] === 'yes') {
                try {
                role = await pool.query(`SELECT * FROM roles WHERE id = '${str[1]}'`)
                } catch (error) {
                    logger.error({message: 'Error getting roles from server', data: error})
                }
                if(role.rows.length !== 0) {
                    logger.info({message: 'getRole is defined'})
                    token = jwt.sign(
                        {studentnumber: str[1],
                        role: role.rows[0].role || 'user'
                        },
                        process.env.JWT_TOKEN,
                        {
                            expiresIn: "2h"
                        }
                    )
                } else {
                    logger.info({message: 'New user detected creating new user in database'})
                    try {
                        await pool.query(`INSERT INTO "public"."roles" ("id", "role") VALUES ('${str[1]}', 'user');`)
                    } catch (error) {
                        logger.error({message: 'Error creating new user in database', data: error})
                        let err =  new Error(error)
                        err.http_code = 500;
                        err.stack = error
                        throw err;
                    }
                    token = jwt.sign(
                        {studentnumber: str[1],
                        role: 'user'
                        },
                        process.env.JWT_TOKEN,
                        {
                            expiresIn: "2h"
                        }
                    )
                }
                
                logger.verbose({message: 'token', data: token});
                return res.redirect("http://localhost:3000/?token=" + token + "&stdid=" + str[1] + "&role=" + role.rows[0].role);
            }

            
        });
    } catch (error) {
        logger.error({message: error.message, data: error.stack})
        res.status(error.http_code).send('Error in redirect');
    }
})


app.get("/testAPI", auth, async (req, res) => {
    console.log(req.user)
    res.status(200).send(`A user has tested the API with id ${req.user.studentnumber} and role ${req.user.role}`);



    
})

// Courses
//Get All
app.get("/api/allCourses", async (req,res) => {
    try {
        var getAll = await pool.query("SELECT * FROM courses");
        res.status(200).json(getAll.rows);
    } catch (error) {
        logger.error({message: `Error while getting all courses`, data: error})
        res.status(404).send(error.message);
    }
})

//Get One
app.get("/api/getOneCourse/:id", async (req,res) => {
    try {
        var {id} = req.params;
        var getOne = await pool.query(`SELECT * FROM courses WHERE courseId = ${id}`);
        res.status(200).json(getOne.rows);
    } catch (error) {
        logger.error({message: `Error while getting course with id: ${id}`, data: error})
        res.status(404).send(error.message);
    }
})

//Create
app.post("/api/createCourse", async (req,res) =>{
    try {
        var {courseId, name, number} = req.body;
        const newObj = await pool.query(`INSERT INTO courses (courseId,name,number) VALUES(${courseId},'${name}',${number})`);
        res.status(200).json(newObj);
    } catch (error) {
        logger.error({message: `Error creating course with id: ${id}`, data: error})
        res.status(500).send(error.message);
    }
})

//Update
app.put("/api/updateCourse/:id", async (req,res) => {
    try {
        var {id} = req.params;
        var updateObj = await pool.query(`UPDATE courses SET number = '65282' WHERE courseId = ${id}`);
        res.status(200).json(updateObj)
    } catch (error) {
        logger.error({message: `Error updating course with id: ${id}`, data: error})
        res.status(500).send(error.message);
    }
})

//Delete
app.delete("/api/deleteCourse/:id", async (req,res) => {
    try {
        var {id} = req.params;
        var delPerson = await pool.query(`DELETE FROM courses WHERE courseId = ${id}`);
        res.status(200).send("Object was deleted!");
    } catch (error) {
        logger.error({message: `Error deleting course with id: ${id}`, data: error})
        res.status(500).send(error.message);
    }
})

// Days
//get days for one coures
app.get("/api/getDaysForCourse/:id", async (req,res) => {
    try {
        var {id} = req.params;
        var getDays = await pool.query(`SELECT * FROM days WHERE courseid = ${id} ORDER BY dayid`);
        res.json(getDays.rows);
    } catch (error) {
        logger.error({message: `Error while getting days for course ${id}`, data: error})
        res.status(404).send(error.message);
    }
})
//create day for course
app.post("/api/CreateDay", async (req,res) => {
    try {
        console.log("/CreateDay has been reached")
        var {name} = req.body;
        var {courseid} = req.body;
        //var data = JSON.parse(req.body);
        var createDay = await pool.query(`INSERT INTO days (name,courseid) VALUES('${name}',${courseid});`);
        res.status(200).json(createDay);
    } catch (error) {
        logger.error({message: `Error while creating day ${id}`, data: error})
        res.status(500).send(error.message);
    }
})
//delete day
app.delete("/api/deleteDay/:id", async (req,res) =>{
    try {
        var {id} = req.params;
        await pool.query(`DELETE FROM days WHERE dayid = ${id}`);
        res.status(200).json("Object was deleted!");
    } catch (error) {
        logger.error({message: `Error while deleting day ${id}`, data: error})
        res.status(500).send(error.message);
    }
})

// Cards
// Get cardsfrom one day
app.get("/api/GetCardsFromdDay/:id", async (req,res) => {
    try {
        var {id} = req.params;
        var getCards = await pool.query(`SELECT * FROM cards WHERE dayid = ${id}`);
        res.status(200).json(getCards.rows);
    } catch (error) {
        logger.error({message: 'Error while getting cards', data: error});
        res.status(404).send(`Error occured while getting cards for day ${id}`);
    }
})
//create card
app.post("/api/CreateCard", async (req,res) => {
    try {
        var {desc, title, dayid, username} = req.body;
        var createDay = await pool.query(`INSERT INTO cards ("desc","title","dayid","username") VALUES('${desc}','${title}',${dayid},'${username}');`);
        logger.info({message: 'Created card for day:', data: { dayid}})
        res.status(200).send('created card');
    } catch (error) {
        logger.error({message: `Error occured while creating card for day ${dayid}`, data: error})
        res.status(500).send('Error while creating card')
    }
})

app.put("/api/UpdateCardStatus", async (req,res) => {
    try {
        var {cardid, status} = req.body;
        var updateStatus = await pool.query(`UPDATE cards SET status=${status} WHERE cardid = ${cardid}`);
        res.status(200).send('updated card');
    } catch (error) {
        logger.error({message: 'Error occured while updating card', data: error});
        res.status(500).send('Error occured while updating card status', error)
    }
})

// Comments
// Create comment for day
app.post("/api/CreateComment", async (req,res) =>{
    try {
        var {comment, username, cardid} = req.body;
        var createDay = await pool.query(`INSERT INTO comments (comment,username,cardid) VALUES('${comment}','${username}',${cardid});`);
        res.json(createDay);
    } catch (error) {
        logger.error({message: `An error occured while creating comment for card with id ${cardid}`, data: error})
        res.status(500).send(error.message);
    }
})
//get all comments for one card
app.get("/api/getCommentsForOneCard/:id", async (req,res) =>{
    try {
        var {id} = req.params;
        var getCards = await pool.query(`SELECT * FROM comments WHERE cardid = ${id}`);
        logger.verbose({message: 'cards retrieved'});
        res.status(200).json(getCards.rows);
    } catch (error) {
        logger.error({message: `An error occured while retrieving comments for card with id ${id}`, data: error })
        res.status(404).send(error.message);
    }
})
//delete comment
app.delete("/api/deleteComment/:id", async (req,res) => {
    try {
        var {id} = req.params;
        var delPerson = await pool.query(`DELETE FROM comments WHERE commentid = ${id}`);
        res.status(200).send("Object was deleted!");
    } catch (error) {
        logger.error({message: `Error deleting comment with id: ${id}`, data: error})
        res.status(500).send(error.message);
    }
})

app.listen(PORT, ()=>{
    logger.info(`server is running on ${PORT}`);
});