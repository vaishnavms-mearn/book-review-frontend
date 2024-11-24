import React, { useState } from 'react';
import { addBookAPI } from '../Services/allAPI'; // Create an API function for adding a book
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    description: '',
  });
  const [coverImage, setCoverImage] = useState(null);
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const reqHeader = {
    Authorization: `Bearer ${token}`,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      bookData.append(key, value);
    });
    if (coverImage) {
      bookData.append('coverImage', coverImage);
    }

    try {
      await addBookAPI(bookData, reqHeader);
      navigate('/my-books'); // Redirect back to the books page
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="add-book">
      <Header />
      <div className="container">
        <h2 className='text-center mt-3'>Add a New Book</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">ISBN</label>
            <input
              type="text"
              className="form-control"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">Genre</label>
            <select
              className="form-control"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Genre</option>
              <option value="fiction">Fiction</option>
              <option value="horror">Horror</option>
              <option value="mystery">Mystery</option>
              <option value="fantasy">Fantasy</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="coverImage" className="form-label">Cover Image</label>
            <input
              type="file"
              className="form-control"
              id="coverImage"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
