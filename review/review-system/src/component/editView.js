import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const EditProduct = () => {
  const [product, setProduct] = useState({ name: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${BASE_URL}api/products/${id}`, product)
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating product:', error));
  };
  const back=()=>{
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Edit Product</h2>
      <label>
        Name:
        <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
      </label>
      <label>
        Description:
        <textarea value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} required />
      </label>
      <button type="submit" className="btn">Update Product</button>
      <button onClick={back} className="btn">back</button>
    </form>
  );
};

export default EditProduct;
