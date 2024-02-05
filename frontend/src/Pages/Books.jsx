import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./Books.css";

Modal.setAppElement("#root");

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = (id) => {
    setBookToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    try {
      await axios.delete("http://localhost:8800/books/" + bookToDelete);
      setBookToDelete(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="Home-page">
      <h1 className="shop-name-header">Welcome to Pravindu's Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="book cover" />}
            <h2 className="book-title">{book.title}</h2>
            <p className="book-description">{book.description}</p>
            <span>Rs.{book.price}/=</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update-button">
              <Link to={`/update/${book.id}`} className="update-button-link">
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="add-button">
        <Link to="/add" className="add-button-link">
          Add New Book
        </Link>
      </button>

      <Modal isOpen={showDeleteModal} className="Modal-class">
        <h2 className="Modal-heading">
          Are you sure you want to delete this book?
        </h2>
        <div className="delete-component-btns">
          <button onClick={confirmDelete} className="delete-confirming-btn">
            Yes, Delete
          </button>
          <button onClick={cancelDelete} className="cancel-confirmation-btn">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Books;
