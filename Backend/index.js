import express from "express";
import mysql from "mysql";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Prabha@79641",
    database:"book_mgt"
})

app.get("/",(req,res) => {
    res.json("Hello I am backend")
})

app.get("/books",(req,res) => {
    const que = "SELECT * FROM books"
    db.query(que,(err,data)=>{
        if(err){
            return res.json(err)
        } 
        else{
            return res.json(data)
        }
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!");
})