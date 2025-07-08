import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Dashboard';
import CartPage from './pages/Cart';
import { CartProvider } from './context/CartContext';
import CheckOut from './pages/CheckOut';
import Confirmation from './pages/Confirmation';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          {/* If token exists, redirect to home */}
          <Route path='/' element={token ? <Navigate to="/home" /> : <Login />} />
          <Route path='/login' element={token ? <Navigate to="/home" /> : <Login />} />

          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/confirmation' element={<Confirmation />} />
          <Route path="/logout" element={<Login />} />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
