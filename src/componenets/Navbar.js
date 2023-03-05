import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar(props) {

  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', "first")
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/")
  }
  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart();
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-warning positiob-sticky">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic" to="/"><h3 style={{ color: "#ff6600", display: 'inline' }}>Freak</h3><h3 style={{ color: "#339933", display: 'inline' }}>Eats</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5 mx-1" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 mx-1" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex '>
                <Link className='btn bg-white text-warning mx-1' to="/login">Login</Link>

                <Link className='btn bg-white text-warning mx-1' to="/signup">Sign Up</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-warning mx-2' onClick={loadCart}>
                  <Badge color='primary' badgeContent={items.length} >
                    <ShoppingCartIcon />
                  </Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                <div className='btn bg-danger text-warning mx-2' onClick={handleLogout}>
                  Logout
                </div>
              </div>

            }



          </div>
        </div>
      </nav>
    </div>
  )
}
