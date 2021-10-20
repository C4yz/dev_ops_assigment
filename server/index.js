const express = require('express');
const app = express();
const pool = require("./db");
const cors = require("cors");

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

//Routes

//Get All
app.get("/all", async (req,res) => {
    try {
        const getAll = await pool.query("SELECT * FROM test");
        res.json(getAll.rows);
    } catch (error) {
        
    }
})

//Get One

//Create
app.post("/create", async (req,res) =>{
    try {
        const {personid} = req.body;
        const newObj = await pool.query("INSERT INTO test (personid) VALUES($1)", 
        [personid]);
        res.json(newObj);
    } catch (error) {
        console.error(error.message);
    }
})

//Update

//Delete

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
});

app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});