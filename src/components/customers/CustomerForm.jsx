import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const CustomerForm = ({ customerId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const customerData = { name, email, phone };
    console.log('Submitting form with data:', customerData);

    if (customerId) {
      // Update customer
      axios.put(`http://localhost:5000/customers/${customerId}`, customerData)
        .then(() => {
          console.log('Customer updated successfully');
          alert('Customer updated successfully');
        })
        .catch(error => {
          console.error('Error updating customer:', error);
        });
    } else {
      // Create new customer
      axios.post('http://localhost:5000/customers', customerData)
        .then(() => {
          console.log('Customer created successfully');
          alert('Customer created successfully');
        })
        .catch(error => {
          console.error('Error creating customer:', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CustomerForm;
