import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Add.css';

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  };

  console.log(book)

  const handleClick = async e =>{
    e.preventDefault()
    try{
        await axios.post("http://localhost:8800/books",book)
        navigate("/");
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="form">
      <h1 className="add-new-book-title">Add New Book</h1>
      <input type="text" placeholder="Title" onChange={handleChange} name="title" className="add-inputs"/>
      <input type="text" placeholder="Description" onChange={handleChange} name="description" className="add-inputs"/>
      <input type="number" placeholder="Price" onChange={handleChange} name="price" className="add-inputs"/>
      <input type="text" placeholder="Cover" onChange={handleChange} name="cover" className="add-inputs"/>
      <button onClick={handleClick} className="formButton">Add</button>
    </div>
  );
};

export default Add;
