import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Navbar({user},{setUser}) {

  const navigate = useNavigate()

  const logout= ()=>{
    localStorage.removeItem("userToken");
    setUser(null);
    console.log(user)
    navigate("/home")
  }
  console.log(user)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
    <a className="navbar-brand" href="#">T-shop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link" >Home</Link>
        </li>


        <li className="nav-item">
          <a className="nav-link" href="#">Categories</a>
        </li>


        <li className="nav-item">
        <a className="nav-link" href="#">Products</a>
      </li>
      {user && <li className="nav-item">
        <a className="nav-link" href="#">Carts</a>
      </li>}

      </ul>
      <ul className="navbar-nav">
      <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown
      </a>
      {
        (!user?<ul className="dropdown-menu ">
        <li><Link to="/register" className="dropdown-item" href="#">register</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link to="/login" className="dropdown-item" href="#">login</Link></li>
      </ul>:<ul className="dropdown-menu ">
        <li><Link to="/register" className="dropdown-item" href="#">profile</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link  className="dropdown-item" href="#" onClick={logout}>logout</Link></li>
      </ul>)
      }
      {/* <ul className="dropdown-menu ">
        <li><Link to="/register" className="dropdown-item" href="#">register</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link to="/login" className="dropdown-item" href="#">login</Link></li>
      </ul> */}
    </li>
      </ul>
   
    </div>
  </div>
</nav>

  )
}
