
  
 // server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({ 
   password: '312283427',
  host: 'localhost',
  user: 'root',
  database: 'review_system'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Get a product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(results[0]);
  });
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, description } = req.body;
  connection.query('INSERT INTO products (name, description) VALUES (?, ?)', [name, description], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, name, description });
  });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  connection.query('UPDATE products SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
    if (err) throw err;
    res.status(200).json({ id, name, description });
  });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(204).end();
  });
});

// Get reviews for a product
app.get('/api/products/:id/reviews', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM reviews WHERE productId = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a review
app.post('/api/products/:id/reviews', (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  connection.query('INSERT INTO reviews (productId, comment, rating) VALUES (?, ?, ?)', [id, comment, rating], (err, results) => {
    if (err) throw err;
    res.status(201).json({ id: results.insertId, productId: id, comment, rating });
  });
});

// Update a review
app.put('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  connection.query('UPDATE reviews SET comment = ?, rating = ? WHERE id = ?', [comment, rating, id], (err) => {
    if (err) throw err;
    res.status(200).json({ id, comment, rating });
  });
});

// Delete a review
app.delete('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM reviews WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.status(204).end();
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
