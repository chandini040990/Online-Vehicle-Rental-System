import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { useState } from "react";


export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [click, setClick] = useState(false);


  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>WHEELS 4 RENT</span>
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink className="nav-links"
                aria-current="page"
                to="/"
                activeClassName="active"
                onClick={handleClick}>
                HOME
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-links"
                aria-current="page"
                to="/cars"
                activeClassName="active"
                onClick={handleClick}>
                CARS
              </NavLink>
            </li>

            <div className="dropdown nav-item">
              <li>
                <a
                  className="nav-links pointer dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  CATEGORIES
                </a>

                <ul
                  className="dropdown-menu"
                  style={{ height: "300px", overflow: "scroll" }}
                >
                  <li>
                    <NavLink className="nav-links"
                      to="/categories"
                      activeClassName="active"
                      onClick={handleClick}>
                      All Categories
                    </NavLink>
                  </li>

                  {categories?.map((c) => (
                    <li key={c._id}>
                      <NavLink className="nav-links"
                        to={`/category/${c.slug}`}
                        activeClassName="active"
                        onClick={handleClick}>
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </div>

            {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
            <li className="nav-item">
              <Badge
                count={cart?.length >= 1 ? cart.length : 0}
                offset={[4, -5]}
                // offset={[-5, 11]}
                showZero={true}
              >
                <NavLink
                  className="nav-links"
                  aria-current="page"
                  to="/cart"
                  activeClassName="active"
                  onClick={handleClick}>
                  CART
                </NavLink>
              </Badge>
            </li>
            {/* </ul> */}
            <li className="px-5">
              <Search />
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-links"
                    to="/login"
                    activeClassName="active"
                    onClick={handleClick}>
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-links"
                    to="/register"
                    activeClassName="active"
                    onClick={handleClick}>
                    REGISTER
                  </NavLink>
                </li>
              </>
            ) : (
              <div className="dropdown">
                <li>
                  <a
                    className="nav-links pointer dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {auth?.user?.name?.toUpperCase()}
                  </a>

                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="nav-links"
                        to={`/dashboard/${
                          // auth?.user?.role === 1 ? "admin" : "user" 
                          auth?.user.role
                          }`}
                        onClick={handleClick}
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li className="nav-item pointer">
                      <a onClick={logout} className="nav-links">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </div>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>

            {/* {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )} */}
          </div>
        </div>
      </nav>
    </>
  );
}