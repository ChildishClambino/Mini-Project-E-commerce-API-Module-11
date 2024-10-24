import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/orders')
      .then(response => {
        console.log('Fetched orders:', response.data); // Log the fetched orders
        setOrders(response.data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Customer ID: {order.customer_id}</p>
            <p>Order Date: {order.order_date}</p>
            <p>Products:</p>
            <ul>
              {order.products.map(product => (
                <li key={product.product_id}>
                  Product ID: {product.product_id}, Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;