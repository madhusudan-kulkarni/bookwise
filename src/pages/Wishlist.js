import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Wishlist() {
  const { wishlistData, setWishlistData, state, cartData, setCartData } =
    useDataContext();
  const [loader, setLoader] = useState(true);

  const notify = (message) => {
    toast(message, {
      position: "bottom-right",
      className: "toast-message",
    });
  };

  const removeWishlistItem = async (event) => {
    const productId = event.target.value;
    const encodedToken = localStorage.getItem("encodedToken");
    try {
      const response = await fetch(`/api/user/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          authorization: encodedToken,
        },
      });
      const { wishlist } = await response.json();
      setWishlistData(wishlist);
      notify("Item Removed From Wishlist");
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (event) => {
    const clickedItem = state.productData.find(
      ({ _id }) => _id === event.target.value
    );
    const encodedToken = localStorage.getItem("encodedToken");
    const isItemAlreadyPresent = cartData.findIndex(
      (product) => product._id === clickedItem._id
    );
    if (state.isLoggedIn === true && isItemAlreadyPresent === -1) {
      try {
        const response = await fetch("/api/user/cart", {
          method: "POST",
          headers: {
            authorization: encodedToken,
          },
          body: JSON.stringify({ product: clickedItem }),
        });
        const { cart } = await response.json();
        setCartData(cart);
      } catch (err) {
        console.log(err);
      }
    } else {
      if (state.isLoggedIn === false) {
        alert("Please Login First");
      } else {
        const incrementQty = async () => {
          const response = await fetch(`/api/user/cart/${clickedItem._id}`, {
            method: "POST",
            headers: {
              authorization: encodedToken,
            },
            body: JSON.stringify({ action: { type: "increment" } }),
          });
          const { cart } = await response.json();
          setCartData(cart);
        };
        incrementQty();
      }
    }
    removeWishlistItem(event);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
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
    <div className="wishlist-container">
      <h1 style={{ textAlign: "center", margin: "1rem" }}>Your Wishlist</h1>
      {wishlistData.length === 0 && (
        <h1 style={{ textAlign: "center", margin: "2rem" }}>
          No Items In Wishlist
        </h1>
      )}
      <div className="wishlist-card">
        {wishlistData.map((product) => (
          <div className="wishlist-card-inner" key={product._id}>
            <img
              src={product.image}
              className="wishlist-image"
              alt={product._id}
            ></img>
            <div className="wishlist-details">
              <p style={{ fontSize: "1.2rem" }}>{product.title}</p>
              <p>Price: ₹ {product.price}</p>
              <button
                className="btn-basic wishlist-btn"
                onClick={removeWishlistItem}
                value={product._id}
              >
                Remove
              </button>
              <button
                className="btn-basic wishlist-btn"
                onClick={addToCart}
                value={product._id}
              >
                Move To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
      />
    </div>
  );
}
