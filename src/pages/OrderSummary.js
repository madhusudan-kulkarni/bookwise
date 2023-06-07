import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";

export function OrderSummary() {
  const [loader, setLoader] = useState(true);
  const { deliveryAddress, cartData, setCartData, setDeliveryAddress } =
    useDataContext();
  const navigate = useNavigate();

  const emptyUserCart = () => {
    const productsId = cartData.map((product) => product._id);
    const encodedToken = localStorage.getItem("encodedToken");
    productsId.forEach(async (Id) => {
      const response = await fetch(`/api/user/cart/${Id}`, {
        method: "DELETE",
        headers: {
          authorization: encodedToken,
        },
      });
      const { cart } = await response.json();
      setCartData(cart);
      setDeliveryAddress([]);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2500);
    setTimeout(() => {
      navigate("/");
      emptyUserCart();
    }, 12000);
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
    <div className="order-summary-container">
      <h1 style={{ textAlign: "center" }}>Order Summary</h1>
      <p className="redirect">Order Received</p>
      <p className="redirect">You will be redirected shortly</p>
      <div className="order-summary">
        <h1 style={{ color: "green" }}>Order Confirmed</h1>
        <p className="summary-para">
          Payment Mode: <span>Pay On Delivery</span>
        </p>
        <p className="summary-para">
          Total Price: ₹{" "}
          {cartData.reduce((acc, { price, qty }) => (acc += price * qty), 0)}
        </p>
        <p className="summary-para">Order Will Be Delivered To : </p>
        <div
          className="summary-para"
          style={{
            border: "2px dashed #0e4fa4",
            width: "fit-content",
            padding: "1rem",
          }}
        >
          <h1>{deliveryAddress.firstName}</h1>
          <p>
            {deliveryAddress.city}, {deliveryAddress.state} <br /> Pin:{" "}
            {deliveryAddress.zipcode}
          </p>
        </div>
        <h1 style={{ color: "green" }}>Items Ordered :</h1>
        <div>
          {cartData.map((product) => (
            <div className="order-summary-card" key={product.title}>
              <img
                className="products-image-cart"
                alt={product.title}
                src={product.image}
              ></img>
              <div className="cart-description">
                <p style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>
                  {product.title}
                </p>
                <p>Price: ₹ {product.price}</p>
                <div className="qty-container">Quantity: {product.qty}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
