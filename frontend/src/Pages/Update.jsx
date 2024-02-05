import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Update.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!book.title || !book.description || !book.price || !book.cover) {
      toast.warn("Please Enter Details", {
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
      await axios.put("http://localhost:8800/books/" + bookId, book);
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
      <h1 className="update-book-title">Update the Book</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
        className="update-inputs"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="description"
        className="update-inputs"
      />
      <input
        type="number"
        placeholder="Price"
        onChange={handleChange}
        name="price"
        className="update-inputs"
      />
      <input
        type="text"
        placeholder="Cover"
        onChange={handleChange}
        name="cover"
        className="update-inputs"
      />
      <button onClick={handleClick} className="update-formButton">
        Update
      </button>
    </div>
  );
};

export default Update;
