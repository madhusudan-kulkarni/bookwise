import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import Mockman from "mockman-js";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDataContext } from "./context/dataContext";
import { IndividualProduct } from "./pages/IndividualProduct";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Login } from "./pages/Login";
import { Auth } from "./components/Auth";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { useState, useEffect } from "react";
import { FallingLines } from "react-loader-spinner";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";
import { Callouts } from "./components/Callouts";
import { Checkout } from "./pages/Checkout";
import { OrderSummary } from "./pages/OrderSummary";

function App() {
  const { dispatch, state } = useDataContext();
  const [menuToggle, setMenuToggle] = useState(false);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const showMenu = () => {
    setMenuToggle(!menuToggle);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  return loader ? (
    <div className="loader-container">
      <FallingLines
        height="80"
        width="80"
        color="#0e4fa4"
        ariaLabel="falling-lines-loading"
        wrapperStyle={{}}
        wrapperClassName="loader"
        visible={true}
      />
    </div>
  ) : (
    <div className="App">
      <div className="nav-bar" id="nav-bar">
        <div className="logo-container">
          <h1 className="logo" onClick={() => navigate("/")}>
            BookWise
          </h1>
        </div>
        <input
          type="search"
          className="search-input"
          placeholder="Search for an item"
          onChange={(event) =>
            dispatch({ type: "search", payload: event.target.value })
          }
        ></input>
        <header>
          <ul
            className={
              menuToggle ? "nav-item-container-active" : "nav-item-container"
            }
          >
            <li>
              <NavLink to="/store" onClick={() => setMenuToggle(!menuToggle)}>
                <AiOutlineShopping size={30} style={{ color: "#0e4fa4" }} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={() => setMenuToggle(!menuToggle)}>
                <div className="callout-container">
                  <AiOutlineShoppingCart
                    size={30}
                    style={{ color: "#0e4fa4" }}
                  />
                  {state.isLoggedIn && <Callouts />}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlist"
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <div className="callout-container">
                  <AiOutlineHeart size={30} style={{ color: "#0e4fa4" }} />
                  {state.isLoggedIn && <Callouts wishlist />}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={() => setMenuToggle(!menuToggle)}>
                <BsPerson size={30} style={{ color: "#0e4fa4" }} />
              </NavLink>
            </li>
          </ul>
          <div className="hamburger" onClick={showMenu}>
            <GiHamburgerMenu size={30} style={{ color: "#0e4fa4" }} />
          </div>
        </header>
      </div>
      <div className="main-page">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/store" element={<Store />}></Route>
          <Route
            path="/store/:productId"
            element={<IndividualProduct />}
          ></Route>
          <Route
            path="/cart"
            element={
              <Auth>
                <Cart />
              </Auth>
            }
          ></Route>
          <Route
            path="/wishlist"
            element={
              <Auth>
                <Wishlist />
              </Auth>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Auth>
                <Profile />
              </Auth>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <Auth>
                <Checkout />
              </Auth>
            }
          ></Route>
          <Route
            path="/order-summary"
            element={
              <Auth>
                <OrderSummary />
              </Auth>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/mock-api" element={<Mockman />}></Route>
        </Routes>
      </div>
      <footer>
        <div className="footer-image-container">
          <div className="header-title" onClick={() => navigate("/")}>
            <h2>BookWise</h2>
          </div>
          <p>Made with ❤️ by Madhusudan K Kulkarni</p>
          <div className="footer-icons">
            <a
              href="https://github.com/madhusudan-kulkarni/bookwise"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub size={40} className="footer-icons" />
            </a>
            <AiOutlineInstagram size={40} className="footer-icons" />
            <FiTwitter size={40} className="footer-icons" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
