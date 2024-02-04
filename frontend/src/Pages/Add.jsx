import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Add.css";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!book.title || !book.description || !book.price || !book.cover) {
      toast.warn("Please Enter All the Details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="add-new-book-title">Add New Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
        className="add-inputs"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="description"
        className="add-inputs"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
        className="add-inputs"
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleChange}
        name="cover"
        className="add-inputs"
      />
      <button onClick={handleClick} className="formButton">
        Add
      </button>
    </div>
  );
};

export default Add;
