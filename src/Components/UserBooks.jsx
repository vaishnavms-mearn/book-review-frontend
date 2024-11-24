import React, { useEffect, useState, useMemo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getUserBooksAPI, deleteBookAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import { Link, useNavigate } from 'react-router-dom';
import EditBookModal from './EditbookModal';

function UserBooks() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null); // State to track selected book for editing
    const [deletingBookId, setDeletingBookId] = useState(null); // State to track which book is being deleted
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();

    const reqHeader = useMemo(() => {
        return token
            ? {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
            : {};
    }, [token]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const response = await getUserBooksAPI(reqHeader);
                setBooks(response.data.books);
            } catch (error) {
                console.error("Error fetching user books:", error);
            }
        };

        fetchUserBooks();
    }, [reqHeader]);

    const handleDelete = async () => {
        if (deletingBookId) {
            try {
                console.log(deletingBookId);

                await deleteBookAPI(deletingBookId, reqHeader);
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletingBookId));
                setDeletingBookId(null); // Reset deleting book state after successful deletion
            } catch (error) {
                console.error("Error deleting book:", error);
                setDeletingBookId(null); // Reset in case of an error
            }
        }
    };

    const handleDeleteClick = (bookId) => {
        setDeletingBookId(bookId); // Set the book ID to delete
    };

    const handleEdit = (book) => {
        setSelectedBook(book); // Open Edit Modal with selected book
    };

    const handleAddBook = () => {
        navigate('/add-book');
    };

    const closeModal = () => {
        setSelectedBook(null); // Close the modal
    };

    const updateBookList = (updatedBooks) => {
        setBooks(updatedBooks); // Update the list of books
    };

    return (
        <div className="container">
            <h2 className='text-center mt-3'>My Books</h2>
            <div className="list-group mt-4">
                {books.map((book, index) => (

                    <div
                        key={index}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                    >
                       <Link to={`/view-book/${book.id}`} style={{ textDecoration: 'none' }} >
                            <img
                                src={book.coverUrl ? `${base_Url}/${book.coverUrl}` : 'default-image.jpg'}
                                alt={book.title}
                                className="img-thumbnail"
                                style={{ width: '150px', height: '155px', marginRight: '15px' }}
                            />
                        </Link>
                        <div>
                            <h5 className="mb-1">{book.title}</h5>
                            <p className="mb-1">{book.author}</p>
                            <small>{book.genre}</small>
                        </div>

                        <div style={{ marginLeft: 'auto' }}>
                            <FaEdit
                                onClick={() => handleEdit(book)}
                                style={{ cursor: 'pointer', marginRight: '15px' }}
                            />
                            <FaTrash
                                onClick={() => handleDeleteClick(book.id)}
                                style={{ cursor: 'pointer', color: 'red' }}
                            />
                        </div>
                    </div>

                ))}
            </div>
            <div className="mt-4">
                <button className="btn btn-primary" onClick={handleAddBook}>
                    Add Book
                </button>
            </div>

            {/* Render EditBookModal if a book is selected */}
            {selectedBook && (
                <EditBookModal
                    book={selectedBook}
                    onClose={closeModal}
                    onBookUpdated={updateBookList}
                />
            )}

            {/* Confirmation Modal for Deleting a Book */}
            {deletingBookId && (
                <div
                    className="modal show"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setDeletingBookId(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this book?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setDeletingBookId(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserBooks;
