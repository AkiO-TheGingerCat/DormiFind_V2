import { useEffect, useState } from "react";
import axios from "axios";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        rating: newRating,
        comment: newComment,
      });
      setNewRating(5);
      setNewComment("");
      fetchReviews();
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - reviewsPerPage < 0
        ? reviews.length - (reviews.length % reviewsPerPage || reviewsPerPage)
        : prevIndex - reviewsPerPage
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + reviewsPerPage) % reviews.length
    );
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + reviewsPerPage
  );

  return (
    <div className="reviews-section">
      <h2>
        What people Think <span>About Us</span>
      </h2>

      <div className="reviews-container">
        {visibleReviews.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="stars">
              {"★".repeat(r.rating)}{" "}
              <span className="date">{r.date}</span>
            </div>
            <p className="comment">{r.comment}</p>
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button onClick={handlePrev}>‹</button>
        <button onClick={handleNext}>›</button>
      </div>

      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Leave a Review</h3>
        <label>
          Rating:
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Star{star !== 1 && "s"}
              </option>
            ))}
          </select>
        </label>

        <label>
          Your Feedback:
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your review here..."
            required
          />
        </label>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
