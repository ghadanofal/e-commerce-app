import React, { useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./navbar.css";
import { UserContext } from "../context/User";
import { CartContext } from "../context/Cart";
import { CiShoppingCart } from "react-icons/ci";



export default function Navbar() {
  const navigate = useNavigate();
  let { userToken, userData, setUserData } = useContext(UserContext);
  const {getCartContext}= useContext(CartContext)

  const {count, setCount}= useContext(CartContext)
  console.log(count)
 

  const logout = ()=>{
    localStorage.removeItem('userToken')
    userToken(null)
    setUserData(null)
    navigate('/')
    
    
  }
  //console.log(user)
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <a className="navbar-brand" href="#">
          G-shop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home 
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Categories
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Products
              </a>
            </li>

            {userToken ? (
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Carts <CiShoppingCart /> {count}
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                
                {userData!=null? (userData.userName):'Account'}
              </a>

              {userToken == null ? (
                <>
                  <ul className="dropdown-menu ">
                    <li>
                      <Link to="/register" className="dropdown-item" href="#">
                        register
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link to="/login" className="dropdown-item" href="#">
                        login
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <ul className="dropdown-menu ">
                    <li>
                      <Link to="/profile" className="dropdown-item" href="#">
                        profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#" onClick={logout}>
                        logout
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
