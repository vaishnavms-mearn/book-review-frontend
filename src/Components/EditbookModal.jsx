import React, { useState, useRef } from 'react';
import { updateBookAPI } from '../Services/allAPI';
import { base_Url } from '../Services/base_Url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditBookModal({ book, onClose, onBookUpdated }) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    genre: book.genre,
    description: book.description,
  });
  const [coverImage, setCoverImage] = useState(null); // Store new image file
  const [previewImage, setPreviewImage] = useState(
    book.coverUrl ? `${base_Url}/${book.coverUrl}` : 'default-image.jpg'
  ); // Show existing image or a default image
  const fileInputRef = useRef(null); // Reference for file input
  const token = sessionStorage.getItem("token");

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
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Update preview
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input click
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
      const response = await updateBookAPI(book.id, bookData, reqHeader);

      // Log the response for debugging
      console.log("API Response:", response);

      const updatedBook = response?.data?.book || response?.book;

      if (updatedBook) {
        onBookUpdated((prevBooks) =>
          prevBooks.map((b) => (b.id === book.id ? updatedBook : b))
        );
        toast.success("Book updated successfully!"); // Show success toast
        onClose(); // Close the modal
      } else {
        toast.error("Unexpected response format."); // Show error toast
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book. Please try again."); // Show error toast
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Book</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body d-flex">
            {/* Left Column: Image Preview */}
            <div className="image-preview" style={{ marginRight: '20px' }}>
              <img
                src={previewImage}
                alt="Book Cover"
                style={{
                  width: '200px',
                  height: '250px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}>
                Click to change image
              </p>
            </div>

            {/* Right Column: Form */}
            <div className="form-container flex-grow-1">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
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
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
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
                  <label htmlFor="isbn" className="form-label">
                    ISBN
                  </label>
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
                  <label htmlFor="genre" className="form-label">
                    Genre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

    </div>
  );
}

export default EditBookModal;
