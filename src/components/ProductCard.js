import { useNavigate } from "react-router";
import { useDataContext } from "../context/dataContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcLike } from "react-icons/fc";

export function ProductCard({ data }, changeLayout) {
  const { state, cartData, setCartData, wishlistData, setWishlistData } =
    useDataContext();
  const navigate = useNavigate();

  const notify = (message) => {
    toast(message, {
      position: "bottom-right",
      className: "toast-message",
    });
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
        notify("Item Added To Cart");
      } catch (err) {
        console.log(err);
      }
    } else {
      if (state.isLoggedIn === false) {
        notify("Please Login First");
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
        notify("Increased Item Quantity In Cart");
      }
    }
  };

  const addToWishlist = async (event) => {
    const clickedItem = state.productData.find(
      ({ _id }) => _id === event.target.value
    );
    const encodedToken = localStorage.getItem("encodedToken");
    const isItemAlreadyPresent = wishlistData.findIndex(
      (product) => product._id === clickedItem._id
    );
    if (state.isLoggedIn === true && isItemAlreadyPresent === -1) {
      try {
        const response = await fetch("/api/user/wishlist", {
          method: "POST",
          headers: {
            authorization: encodedToken,
          },
          body: JSON.stringify({ product: clickedItem }),
        });
        const { wishlist } = await response.json();
        setWishlistData(wishlist);
        notify("Item Added To Wishlist");
      } catch (err) {
        console.log(err);
      }
    } else {
      if (state.isLoggedIn === false) {
        notify("Please Login First");
      } else {
        notify("Already In Wishlist");
      }
    }
  };

  return (
    <div
      className="product-card"
      style={{ marginBottom: changeLayout ? "1rem" : "" }}
    >
      <img src={data.image} alt={data.title} className="products-image"></img>
      <div className="products-description">
        <p
          style={{ fontSize: "1.3rem", marginBottom: "2%", cursor: "pointer" }}
          onClick={() => navigate(`/store/${data._id}`)}
        >
          {data.title}
        </p>
        <p style={{ color: "gray", marginBottom: "2%" }}>{data.author}</p>
        <p style={{ color: "gray", marginBottom: "2%" }}>{data.categoryName}</p>
        <p style={{ fontSize: "1.2rem", marginBottom: "2%" }}>
          Price: ₹ {data.price}
        </p>
        <p style={{ fontSize: "1rem", color: "goldenrod" }}>
          Rating: {data.rating}
        </p>
        <div className="card-btn-container">
          <button className="btn-basic" onClick={addToCart} value={data._id}>
            Add To Cart
          </button>
          <FcLike onClick={addToWishlist} value={data._id} size={35} />
        </div>
      </div>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
      />
    </div>
  );
}
