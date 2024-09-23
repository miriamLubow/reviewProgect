import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import ProductList from './component/productList';
import EditProduct from './component/editView';
import ProductReviews from './component/ProductReviews';
import AddProduct from './component/addReview';

const App = () => {
  return (
    <Router>
      <div className="app">
        <h1>Review System</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/products/:id/reviews" element={<ProductReviews />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
