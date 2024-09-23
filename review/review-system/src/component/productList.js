import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../config';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}api/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'are you sure',
      text: 'You will not be able to restore this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!,',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}api/products/${id}`)
          .then(() => setProducts(products.filter(product => product.id !== id)))
          .catch(error => console.error('Error deleting product:', error));
  
        Swal.fire(
          'deleted!',
          'The product has been successfully deleted  .',
          'success'
        );
      }
    });
  };

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/add" className="btn">Add New Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <Link to={`/edit/${product.id}`} className="btn">Edit</Link>
            <button onClick={() => handleDelete(product.id)} className="btn delete-btn">Delete</button>
            <Link to={`/products/${product.id}/reviews`} className="btn">View Reviews</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
