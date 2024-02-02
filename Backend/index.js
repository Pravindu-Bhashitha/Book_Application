import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Prabha@79641",
    database:"book_mgt"
})

app.use(express.json())
app.use(cors())

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

app.post("/books",(req,res) => {
    const que = "INSERT INTO books (`title`,`description`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover
    ]

    db.query(que,[values],(err,data) => {
        if(err) return res.json(err);
        return res.json("Book has been created");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!");
})