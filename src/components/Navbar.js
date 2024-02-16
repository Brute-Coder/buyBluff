import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Badge from "react-bootstrap/Badge";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
  const [cartView,setCartView] = useState(false)
  const data = useCart()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
      navigate("/")
  }
  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success  fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">buyBluff</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item ">
                <Link className="nav-link  active fs-4" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item ">
                  <Link className="nav-link  active mt-2" aria-current="page" to="/">My Order</Link>
                </li> : ""

              }
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div>
                <div className='d-flex'>
                  <Link className="btn bg-white text-black mx-2" to="/login">Login</Link>

                  <Link className="btn bg-white text-black mx-2" to="/signup">Signup</Link>
                </div>
              </div> :
               <div>
               <div className="btn bg-white text-black mx-2" onClick={()=>{setCartView(!cartView)}} >My Cart {" "}
               <Badge pill bg="danger"> {data.length} </Badge></div>
               {cartView ? <Modal onClose={()=>setCartView(false)}><Cart></Cart></Modal>:null}
               <div className="btn bg-white text-danger mx-2"  onClick={handleLogout}>Logout</div>
               </div>
            }
          </div>
        </div>
      </nav>
    </div>

  )
}
