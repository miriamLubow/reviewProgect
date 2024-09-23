import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import '../AddProduct.css';// קובץ CSS לעיצוב

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true); 
  };

  const confirmSubmit = () => {
    axios.post(`${BASE_URL}api/products`, { name, description })
      .then(() => {
        setShowModal(false);
        navigate('/');
      })
      .catch(error => {
        console.error('Error adding product:', error);
        setShowModal(false);
      });
  };

  const cancelSubmit = () => {
    setShowModal(false); 
  };
  const back=()=>{
    navigate('/')
  }

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Add New Product</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit" className="btn">Add Product</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Submission</h3>
            <p>Are you sure you want to add this product?</p>
            <button onClick={confirmSubmit} className="btn">Yes</button>
            <button onClick={cancelSubmit} className="btn">No</button>
            <button onClick={back} className="btn">back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

