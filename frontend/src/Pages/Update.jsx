import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  };

  console.log(book)

  const handleClick = async e =>{
    e.preventDefault()
    try{
        await axios.put("http://localhost:8800/books/" + bookId,book)
        navigate("/");
    }catch(err){
        console.log(err)
    }
  }

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input type="text" placeholder="Title" onChange={handleChange} name="title" />
      <input type="text" placeholder="Description" onChange={handleChange} name="description"/>
      <input type="number" placeholder="Price" onChange={handleChange} name="price"/>
      <input type="text" placeholder="Cover" onChange={handleChange} name="cover"/>
      <button onClick={handleClick} className="formButton">Update</button>
    </div>
  );
};

export default Update;
