import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const UpdateCustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/customers/${id}`)
      .then(response => {
        const customer = response.data;
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
      })
      .catch(error => console.error('Error fetching customer details:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCustomer = { name, email, phone };

    axios.put(`http://localhost:5000/customers/${id}`, updatedCustomer)
      .then(() => {
        alert('Customer updated successfully');
        navigate(`/customers/${id}`);
      })
      .catch(error => console.error('Error updating customer:', error));
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
      <Button type="submit">Update Customer</Button>
    </Form>
  );
};

export default UpdateCustomerForm;