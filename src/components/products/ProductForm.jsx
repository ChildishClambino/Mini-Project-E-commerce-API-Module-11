import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductForm = ({ productId }) => {
  const [product_name, setProductName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (productId) {
      // Fetch product data for updating
      axios.get(`http://localhost:5000/products/${productId}`)
        .then(response => {
          const { product_name, price } = response.data;
          setProductName(product_name);
          setPrice(price);
        })
        .catch(error => console.error(error));
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { product_name, price };

    if (productId) {
      // Update product
      axios.put(`http://localhost:5000/products/${productId}`, productData)
        .then(() => alert('Product updated successfully'))
        .catch(error => console.error(error));
    } else {
      // Create new product
      axios.post('http://localhost:5000/products', productData)
        .then(() => alert('Product created successfully'))
        .catch(error => console.error(error));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" value={product_name} onChange={(e) => setProductName(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ProductForm;
