import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config';

const ProductReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}api/products/${id}/reviews`)
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${BASE_URL}api/products/${id}/reviews`, { comment, rating })
      .then(response => {
        setReviews([...reviews, response.data]);
        setComment('');
        setRating(1);
        setSuccessMessage('Review added successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch(error => console.error('Error adding review:', error));
  };

  const back = () => {
    navigate('/');
  }

  return (
    <div>
      <h2>Reviews for Product ID: {id}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </label>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn">Add Review</button>
        <button type="button" onClick={back} className="btn">Back</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <ul>
        {reviews.map(review => (
          <li key={review.id} className="review-item">
            <p><strong>Rating: {review.rating}</strong></p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductReviews;
