import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
        //console.log(res)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

const handleDelete = async (id) =>{
    try{
        await axios.delete("http://localhost:8800/books/"+id)
        window.location.reload()
    }catch (err) {
        console.log(err);
      }
}
  return (
    <div>
      <h1 className="shop-name-header">Lama Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="book cover" />}
            <h2 className="book-title">{book.title}</h2>
            <p className="book-description">{book.description}</p>
            <span>Rs.{book.price}/=</span>
            <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
            <button className="update-button"><Link to={`/update/${book.id}`} className="update-button-link">Update</Link></button>
          </div>
        ))}
      </div>
      <button className="add-button">
        <Link to="/add" className="add-button-link">Add New Book</Link>
      </button>
    </div>
  );
};

export default Books;
