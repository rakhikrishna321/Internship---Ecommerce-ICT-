import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Product from './components/Product';
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import Order from './components/Order';
import Transaction from './components/Transaction';
import { AuthProvider } from './context/AuthContext';
import UserDashboard from './other/UserDashboard';
import AdminDashboard from './other/AdminDashboard';
import AddProduct from './components/AddProduct';
import AdminProductList from './components/AdminProductList';
import User from './other/User';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/log" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product" element={<Product />} /> {/* Ensure this route points to Product component */}
              <Route path="/order/:id" element={<Order />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/userdash" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/admin/productlist" element={<AdminProductList />} />
              <Route path="/userdashboard" element={<User />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
            <p>Instagram: Saka_mart | Facebook: Saka_mart</p>
            <p>Phone: +1 (234) 567-890</p>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
