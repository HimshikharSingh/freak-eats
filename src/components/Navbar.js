import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar(props) {
  const [cartView, setCartView] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const items = useCart();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch("/api/me", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserName(data.name); // Set the user name
          } else {
            console.error("Failed to fetch user data:", data);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUserName(""); // Clear user name on logout
    window.alert("You have been logged out successfully.");
    navigate("/");
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning position-sticky">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to="/">
            <h3 style={{ color: "#ff6600", display: 'inline' }}>Freak</h3>
            <h3 style={{ color: "#339933", display: 'inline' }}>Eats</h3>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5 mx-1" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5 mx-1" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className='d-flex align-items-center'>
                <span className='text-white mx-3'>Hi, {userName}</span>
                <div className='btn bg-white text-warning mx-2' onClick={loadCart}>
                  <Badge color='primary' badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                </div>
                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                <div className='btn bg-danger text-warning mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>
            ) : (
              <div className='d-flex'>
                <Link className='btn bg-white text-warning mx-1' to="/login">Login</Link>
                <Link className='btn bg-white text-warning mx-1' to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
