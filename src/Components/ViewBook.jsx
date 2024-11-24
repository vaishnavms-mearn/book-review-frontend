import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBookDetailsAPI,
  submitReviewAPI,
  deleteReviewsAPI,
  editReviewAPI,
} from "../Services/allAPI";
import { base_Url } from "../Services/base_Url";
import { Button, Form, Row, Col } from "react-bootstrap";
import StarRating from "./StarRating";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for edit and delete

function ViewBook() {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null); // Track if editing a review
  const token = sessionStorage.getItem("token");

  const reqHeader = useMemo(() => {
    return token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {};
  }, [token]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getBookDetailsAPI(id, reqHeader);
        setBookDetails(response.data.book);
        setReviews(response.data.book.reviews || []);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id, reqHeader]);

  const handleReviewChange = (e) => setReview(e.target.value);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (review && rating > 0) {
      try {
        const payload = { text: review, rating };
        if (editingReviewId) {
          // Edit review
          const response = await editReviewAPI(editingReviewId, payload, reqHeader);
          setReviews((prev) =>
            prev.map((r) => (r.id === editingReviewId ? response?.data.review : r))
          );
          setEditingReviewId(null); // Exit editing mode
        } else {
          // Add new review
          const response = await submitReviewAPI(id, payload, reqHeader);
          setReviews((prev) => [...prev, response.data.review]); // Append new review
        }
        setReview("");
        setRating(0);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      alert("Please provide a review and rating!");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {  // Confirmation prompt
      try {
        await deleteReviewsAPI(reviewId, reqHeader);
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));  // Remove from state
        alert("Review deleted successfully!");  // Optional feedback
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Please try again later.");  // Optional error feedback
      }
    }
  };


  const handleEditReview = (review) => {
    setReview(review.text);
    setRating(review.rating);
    setEditingReviewId(review.id); // Set the review to edit
  };

  return (
    <div className="container mt-5">
      {/* Book Details Section */}
      {bookDetails ? (
        <Row>
          <Col md={4}>
            <img
              src={
                bookDetails.coverUrl
                  ? `${base_Url}/${bookDetails.coverUrl}`
                  : "default-image.jpg"
              }
              alt={bookDetails.title || "Book cover"}
              className="img-fluid rounded"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
          <Col md={8}>
            <h2>{bookDetails.title || "No Title"}</h2>
            <h4>{bookDetails.author || "No Author"}</h4>
            <p>
              <strong>Genre:</strong> {bookDetails.genre || "No Genre"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {bookDetails.description || "No Description"}
            </p>
          </Col>
        </Row>
      ) : (
        <p>Loading book details...</p>
      )}

      {/* Reviews Section */}
      <div className="mt-4">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="border p-3 mb-3 rounded">
              <p>
                <strong>Rating:</strong> {rev.rating}/5
              </p>
              <p>{rev.text}</p>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => handleEditReview(rev)}
              >
                <FaEdit /> Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteReview(rev.id)}
              >
                <FaTrash /> Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Review Form */}
      <div className="mt-4">
        <h3>{editingReviewId ? "Edit Review" : "Write a Review"}</h3>
        <Form onSubmit={handleSubmitReview}>
          <Form.Group controlId="review" className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here"
              required
            />
          </Form.Group>

          <Form.Group controlId="rating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <StarRating rating={rating} setRating={setRating} />
          </Form.Group>

          <Button type="submit" variant="primary">
            {editingReviewId ? "Update Review" : "Submit Review"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ViewBook;
