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
    <nav className="navbar navbar-expand-lg  ">
      <div className="container">
        <a className="navbar-brand" href="#">
          {/* <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 10 5 C 7.2504839 5 5 7.2504839 5 10 L 5 16.951172 A 1.0005646 1.0005646 0 0 0 5 17.050781 L 5 28.228516 A 1.0001 1.0001 0 0 0 5 28.453125 L 5 40 C 5 42.749516 7.2504839 45 10 45 L 40 45 C 42.749516 45 45 42.749516 45 40 L 45 28.460938 A 1.0001 1.0001 0 0 0 45 28.236328 L 45 16.992188 L 45 10 C 45 7.2504839 42.749516 5 40 5 L 10 5 z M 10 7 L 40 7 C 41.668484 7 43 8.3315161 43 10 L 43 13.583984 C 42.733855 13.062406 42.442885 12.537395 42.050781 12.074219 C 41.579715 11.517768 40.881 11 40 11 C 39.475223 11 39.069791 11.162514 38.728516 11.361328 C 38.703776 11.271358 38.729919 11.275538 38.699219 11.183594 C 38.542599 10.713725 38.301666 10.200104 37.863281 9.7617188 C 37.424896 9.3233338 36.75 9 36 9 C 35 9 34.31469 9.545946 33.533203 10.144531 C 32.751716 10.743117 31.912106 11.489065 31 12.21875 C 29.175788 13.678119 27.1 15 25 15 C 22.9 15 20.824212 13.678119 19 12.21875 C 18.087894 11.489065 17.248284 10.743117 16.466797 10.144531 C 15.68531 9.545946 15 9 14 9 C 13.25 9 12.575104 9.3233339 12.136719 9.7617188 C 11.698334 10.200104 11.457404 10.713725 11.300781 11.183594 C 11.270131 11.275534 11.296184 11.271364 11.271484 11.361328 C 10.930212 11.162514 10.524777 11 10 11 C 9.119 11 8.4202849 11.517768 7.9492188 12.074219 C 7.5571146 12.537395 7.2661447 13.062406 7 13.583984 L 7 10 C 7 8.3315161 8.3315161 7 10 7 z M 14 11 C 14 11 14.56469 11.204054 15.251953 11.730469 C 15.939216 12.256883 16.787106 13.010935 17.75 13.78125 C 19.675788 15.321881 22.1 17 25 17 C 27.9 17 30.324212 15.321881 32.25 13.78125 C 33.212894 13.010935 34.060784 12.256883 34.748047 11.730469 C 35.43531 11.204054 36 11 36 11 C 36.25 11 36.325104 11.05167 36.449219 11.175781 C 36.573334 11.299896 36.707404 11.536275 36.800781 11.816406 C 36.987536 12.37667 37 13 37 13 A 1.0001 1.0001 0 0 0 37.029297 13.244141 C 37.068767 13.401574 37.165157 13.638785 37.402344 13.828125 C 37.63953 14.017465 37.964364 14.071677 38.164062 14.052734 C 38.56346 14.014854 38.662613 13.892504 38.771484 13.818359 C 38.989227 13.67007 39.125885 13.540321 39.287109 13.410156 C 39.609556 13.149827 39.950333 13 40 13 C 40.119 13 40.259425 13.05301 40.525391 13.367188 C 40.791356 13.681361 41.087774 14.206322 41.371094 14.78125 C 41.654414 15.356178 41.928169 15.975975 42.246094 16.533203 C 42.450134 16.890826 42.668074 17.253831 43 17.544922 L 43 28.095703 C 41.506352 31.00022 38.492581 33 35 33 C 33.545132 33 32.185569 32.638709 30.970703 32.025391 C 30.83598 31.019167 30.172014 30.1448 29.240234 29.416016 C 28.194351 28.597985 26.730556 28 25 28 C 23.269444 28 21.805649 28.597985 20.759766 29.416016 C 19.827986 30.1448 19.16402 31.019167 19.029297 32.025391 C 17.814431 32.638709 16.454868 33 15 33 C 11.507419 33 8.4936492 31.00022 7 28.095703 L 7 17.544922 C 7.331926 17.253831 7.5498655 16.890826 7.7539062 16.533203 C 8.0718314 15.975975 8.3455866 15.356178 8.6289062 14.78125 C 8.9122261 14.206322 9.2086442 13.681361 9.4746094 13.367188 C 9.7405745 13.053013 9.881 13 10 13 C 10.04967 13 10.390441 13.149827 10.712891 13.410156 C 10.874115 13.540321 11.010773 13.67007 11.228516 13.818359 C 11.337387 13.892509 11.43654 14.014849 11.835938 14.052734 C 12.035635 14.071674 12.36047 14.017464 12.597656 13.828125 C 12.834843 13.638785 12.931233 13.401574 12.970703 13.244141 A 1.0001 1.0001 0 0 0 13 13 C 13 13 13.01246 12.37667 13.199219 11.816406 C 13.292599 11.536275 13.426666 11.299896 13.550781 11.175781 C 13.674896 11.051666 13.75 11 14 11 z M 11.044922 12.732422 C 11.044361 12.767888 11 13 11 13 L 11.029297 12.755859 C 11.030697 12.750359 11.043312 12.738312 11.044922 12.732422 z M 38.955078 12.732422 C 38.956678 12.738322 38.969333 12.750389 38.970703 12.755859 L 39 13 C 39 13 38.955638 12.767888 38.955078 12.732422 z M 15 16 C 11.698375 16 9 18.698375 9 22 L 9 24 C 9 27.301625 11.698375 30 15 30 C 18.301625 30 21 27.301625 21 24 L 21 22 C 21 18.698375 18.301625 16 15 16 z M 35 16 C 31.698375 16 29 18.698375 29 22 L 29 24 C 29 27.301625 31.698375 30 35 30 C 38.301625 30 41 27.301625 41 24 L 41 22 C 41 18.698375 38.301625 16 35 16 z M 15 18 C 17.220375 18 19 19.779625 19 22 L 19 24 C 19 26.220375 17.220375 28 15 28 C 12.779625 28 11 26.220375 11 24 L 11 22 C 11 19.779625 12.779625 18 15 18 z M 35 18 C 37.220375 18 39 19.779625 39 22 L 39 24 C 39 26.220375 37.220375 28 35 28 C 32.779625 28 31 26.220375 31 24 L 31 22 C 31 19.779625 32.779625 18 35 18 z M 15 20 C 14.71 20 14.429688 20.059687 14.179688 20.179688 C 14.669688 20.409687 15 20.91 15 21.5 C 15 22.33 14.33 23 13.5 23 C 13.32 23 13.16 22.970156 13 22.910156 L 13 24 C 13 25.1 13.9 26 15 26 C 16.1 26 17 25.1 17 24 L 17 22 C 17 21.45 16.780156 20.949844 16.410156 20.589844 C 16.050156 20.219844 15.55 20 15 20 z M 35 20 C 34.71 20 34.429688 20.059687 34.179688 20.179688 C 34.669688 20.409687 35 20.91 35 21.5 C 35 22.33 34.33 23 33.5 23 C 33.32 23 33.16 22.970156 33 22.910156 L 33 24 C 33 25.1 33.9 26 35 26 C 36.1 26 37 25.1 37 24 L 37 22 C 37 21.45 36.780156 20.949844 36.410156 20.589844 C 36.050156 20.219844 35.55 20 35 20 z M 25 30 C 26.269444 30 27.305649 30.439515 28.009766 30.990234 C 28.673017 31.508992 28.954626 32.144523 28.986328 32.351562 A 1.0001 1.0001 0 0 0 28.951172 32.535156 C 28.856553 32.715424 28.604737 33.024197 28.0625 33.314453 C 27.334518 33.704138 26.22657 34 25 34 C 23.77343 34 22.665482 33.704138 21.9375 33.314453 C 21.898947 33.293816 21.877487 33.272735 21.841797 33.251953 A 1.0001 1.0001 0 0 0 21.734375 33.183594 C 21.344006 32.934389 21.127021 32.688272 21.046875 32.535156 A 1.0001 1.0001 0 0 0 21.013672 32.351562 C 21.045374 32.144523 21.326983 31.508992 21.990234 30.990234 C 22.694351 30.439515 23.730556 30 25 30 z M 7 31.533203 C 9.0088449 33.664407 11.85236 35 15 35 C 16.636693 35 18.186044 34.624694 19.585938 33.978516 C 19.727204 34.151934 19.895209 34.307808 20.072266 34.457031 C 20.037187 34.635589 20 34.81423 20 34.998047 C 20 36.143033 20.563757 37.26098 21.419922 38.236328 C 22.276087 39.211676 23.509781 40.039062 25 40.039062 C 26.490219 40.039062 27.723913 39.211676 28.580078 38.236328 C 29.436243 37.26098 30 36.143033 30 34.998047 C 30 34.81423 29.962813 34.635589 29.927734 34.457031 C 30.104791 34.307808 30.272796 34.151934 30.414062 33.978516 C 31.813956 34.624694 33.363307 35 35 35 C 38.14764 35 40.991155 33.664407 43 31.533203 L 43 40 C 43 41.668484 41.668484 43 40 43 L 10 43 C 8.3315161 43 7 41.668484 7 40 L 7 31.533203 z M 22.134766 35.548828 C 22.992493 35.831421 23.958414 36 25 36 C 26.041586 36 27.007507 35.831421 27.865234 35.548828 C 27.719782 35.962841 27.460406 36.482473 27.078125 36.917969 C 26.48679 37.591621 25.719781 38.039062 25 38.039062 C 24.280219 38.039062 23.51321 37.591621 22.921875 36.917969 C 22.539594 36.482473 22.280218 35.962841 22.134766 35.548828 z"/></svg> */}
        {/* <img src="/img/images.png" alt="" className="w-25"/> */}
        <img src="/img/logo.png" alt="" />
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
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            {userToken ? (
              <li className="nav-item">
                <Link className=" nav-link d-flex" to="/cart">
                 Carts <CiShoppingCart /> <div className=" count">{count}</div>
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
                      <Link to="/profile/info" className="dropdown-item" href="#">
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
