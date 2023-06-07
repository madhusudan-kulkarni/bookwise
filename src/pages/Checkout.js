import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Checkout() {
  const [loader, setLoader] = useState(true);
  const { addresses, deliveryAddress, setDeliveryAddress, cartData } =
    useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  const notify = (message) => {
    toast(message, {
      position: "bottom-right",
      className: "toast-message",
    });
  };

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
    <div className="checkout-page">
      <div className="checkout-left">
        <h1>Address Details</h1>
        {addresses.length < 1 && (
          <div>
            <p>No Address Added</p>
            <p>
              To Add Address{" "}
              <span
                onClick={() => navigate("/profile")}
                style={{
                  color: "#0e4fa4",
                  textDecorationLine: "underline",
                  cursor: "pointer",
                }}
              >
                click here
              </span>
            </p>
          </div>
        )}
        {addresses.map((address, index) => (
          <div className="address-details-container" key={address.zipcode}>
            <input
              type="radio"
              id={address.firstName}
              name="radio-checkout"
              className="accent-color"
              value={index}
              onChange={(event) => {
                if (event.target.checked === true) {
                  setDeliveryAddress(addresses[event.target.value]);
                }
              }}
            ></input>
            <label htmlFor={address.firstName}>
              <h1>{address.firstName}</h1>
              <p>
                {address.city}, {address.state} Pin: {address.zipcode}
              </p>
            </label>
          </div>
        ))}
      </div>
      <div className="checkout-right">
        <h1>Price Details</h1>
        <div className="price-details-container">
          {cartData.map((product) => (
            <div className="price-details" key={product.title}>
              <span className="details-span">{product.title}</span>
              <span className="details-span">X{product.qty}</span>
            </div>
          ))}
          <div className="total-price">
            Total Price: ₹{" "}
            {cartData.reduce((acc, { price, qty }) => (acc += price * qty), 0)}
          </div>
        </div>
        <button
          className="form-btn"
          onClick={() => {
            if (Object.keys(deliveryAddress).length > 0) {
              navigate("/order-summary");
            } else {
              notify("Address Not Selected");
            }
          }}
        >
          Place Order
        </button>
      </div>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
      />
    </div>
  );
}
