import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            ID: {product.id} - {product.product_name} - ${product.price}
            <Link to={`/update-product/${product.id}`}>
              <button>Update</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
