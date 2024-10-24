import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const OrderForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [products, setProducts] = useState([{ product_id: '', quantity: '' }]);

  const handleProductChange = (index, event) => {
    const newProducts = products.slice();
    newProducts[index][event.target.name] = event.target.value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { product_id: '', quantity: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = { customer_id: customerId, order_date: orderDate, products };

    axios.post('http://localhost:5000/orders', orderData)
      .then(() => alert('Order placed successfully'))
      .catch(error => console.error(error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Customer ID</Form.Label>
        <Form.Control type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Order Date</Form.Label>
        <Form.Control type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
      </Form.Group>
      {products.map((product, index) => (
        <div key={index}>
          <Form.Group>
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              name="product_id"
              value={product.product_id}
              onChange={(e) => handleProductChange(index, e)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}
              required
            />
          </Form.Group>
        </div>
      ))}
      <Button type="button" onClick={handleAddProduct}>Add Product</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default OrderForm;