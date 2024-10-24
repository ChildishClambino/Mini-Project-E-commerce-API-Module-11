import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerForm from './components/customers/CustomerForm';
import CustomerDetails from './components/customers/CustomerDetails';
import CustomerList from './components/customers/CustomerList';
import UpdateCustomerForm from './components/customers/UpdateCustomerForm';
import ProductForm from './components/products/ProductForm';
import ProductList from './components/products/ProductList';
import UpdateProductForm from './components/products/UpdateProductForm';
import PlaceOrderForm from './components/orders/PlaceOrderForm';
import OrderList from './components/orders/OrderList';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/customers">Customers</Link></li>
          <li><Link to="/new-customer">New Customer</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/new-product">New Product</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/place-order">Place Order</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />
        <Route path="/new-customer" element={<CustomerForm />} />
        <Route path="/update-customer/:id" element={<UpdateCustomerForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/new-product" element={<ProductForm />} />
        <Route path="/update-product/:id" element={<UpdateProductForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/place-order" element={<PlaceOrderForm />} />
      </Routes>
    </Router>
  );
};

export default App;