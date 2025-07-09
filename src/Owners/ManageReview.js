// ManageReview.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageReview.css";

const ManageReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load reviews.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting review with id:", id);
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      alert("Review deleted successfully!");
      fetchReviews();
    } catch (err) {
      alert("Failed to delete review.");
      console.error(err);
    }
  };

  if (loading) return <p className="manage-review-loading">Loading reviews...</p>;
  if (error) return <p className="manage-review-error">{error}</p>;

  return (
    <div className="manage-review-container">
      <h2 className="manage-review-title">Manage Reviews</h2>

      {reviews.length === 0 ? (
        <p className="manage-review-no-reviews">No reviews found.</p>
      ) : (
        <ul className="manage-review-list">
          {reviews.map((review) => (
            <li key={review.id} className="manage-review-card">
              <div className="manage-review-content">
                <p className="manage-review-user">{review.user}</p>
                <p className="manage-review-comment">"{review.comment}"</p>
              </div>
              <button
                className="manage-review-delete-btn"
                onClick={() => handleDelete(review.id)}
                aria-label={`Delete review by ${review.user}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageReview;
