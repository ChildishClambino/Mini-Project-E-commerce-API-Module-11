import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/customers/${id}`)
      .then(response => {
        setCustomer(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer details:', error);
        setError(error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/customers/${id}`)
      .then(() => {
        alert('Customer deleted successfully');
        navigate('/customers');
      })
      .catch(error => console.error('Error deleting customer:', error));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer Details</h1>
      <p>ID: {customer.id}</p>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <Link to={`/update-customer/${id}`} className="btn btn-primary">Update Customer</Link>
      <button onClick={handleDelete} className="btn btn-danger">Delete Customer</button>
    </div>
  );
};

export default CustomerDetails;
