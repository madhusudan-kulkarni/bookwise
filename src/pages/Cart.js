import { useDataContext } from "../context/dataContext";
import { CartCard } from "../components/CartCard";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Cart() {
  const { cartData } = useDataContext();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const notify = (message) => {
    toast(message, {
      position: "bottom-right",
      className: "toast-message",
    });
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
    <div className="cart-parent">
      <div className="cart-container">
        <h1 style={{ textAlign: "center" }}>Cart</h1>
        {cartData.length === 0 && (
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            Cart Is Empty
          </h1>
        )}
        {cartData.map((product) => (
          <CartCard data={product} key={product._id} />
        ))}
      </div>
      <div className="cart-details-checkout-container">
        <h1 style={{ textAlign: "center" }}>Cart Summary</h1>
        <div className="cart-total">
          <span>
            Total Price: ₹{" "}
            {
              <span>
                {cartData.reduce(
                  (acc, { price, qty }) => (acc += price * qty),
                  0
                )}
              </span>
            }
          </span>
          <div style={{ marginTop: "0.5rem" }}>
            <button
              className="btn-basic"
              onClick={() => {
                if (cartData.length !== 0) {
                  navigate("/checkout");
                } else {
                  notify("Add Items To Cart");
                }
              }}
            >
              Checkout
            </button>
          </div>
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
