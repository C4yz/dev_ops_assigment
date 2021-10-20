const express = require('express');
const app = express();
const pool = require("./db");
const cors = require("cors");
const e = require('express');

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
app.get("/getOne/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const getOne = await pool.query(`SELECT * FROM test WHERE personid = ${id}`);
        res.json(getOne.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//Create
app.post("/create", async (req,res) =>{
    try {
        const {personid} = req.body;
        const {name} = req.body;
        const newObj = await pool.query(`INSERT INTO test (personid,name) VALUES(${personid},'${name}')`);
        res.json(newObj);
    } catch (error) {
        console.error(error.message);
    }
})

//Update
app.put("/update/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const updateObj = await pool.query(`UPDATE test SET name = 'Test1' WHERE personid = ${id}`);
        res.json(updateObj)
    } catch (error) {
        console.error(error.message);
    }
})

//Delete
app.delete("/delete/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const delPerson = await pool.query(`DELETE FROM test WHERE personid = ${id}`);
        res.json("Object was deleted!");
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