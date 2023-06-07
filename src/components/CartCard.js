import { useDataContext } from "../context/dataContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CartCard({ data }) {
    const { setCartData } = useDataContext();
    const encodedToken = localStorage.getItem("encodedToken");

    const notify = (message) => {
        toast(message,{
            position: "bottom-right",
            className: "toast-message"
        });
    };


    const incrementQty = async (event) => {
        const productId = event.target.value;
        const response = await fetch(`/api/user/cart/${productId}`, {
            method: "POST",
            headers: {
                authorization: encodedToken,
            },
            body: JSON.stringify({ action: { type: "increment" } }),
        });
        const { cart } = await response.json();
        setCartData(cart);
    };
    const decrementQty = async (event) => {
        const productId = event.target.value;
        const response = await fetch(`/api/user/cart/${productId}`, {
            method: "POST",
            headers: {
                authorization: encodedToken,
            },
            body: JSON.stringify({ action: { type: "decrement" } }),
        });
        const { cart } = await response.json();
        setCartData(cart);
    };
    const deleteItem = async (event) => {
        const productId = event.target.value;
        const response = await fetch(`/api/user/cart/${productId}`, {
            method: "DELETE",
            headers: {
                authorization: encodedToken,
            }
        });
        const { cart } = await response.json();
        setCartData(cart);
        notify("Item Deleted From Cart");
    };

    return (
        <div className="cart-card">
            <img className="products-image-cart" alt={data.title} src={data.image}></img>
            <div className="cart-description">
                <p style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>{data.title}</p>
                <p>Price: ₹ {data.price}</p>
                <div className="qty-container">
                    {data.qty < 2 ? <button className="qty-btn" value={data._id} onClick={deleteItem}>🗑️</button> : <button className="qty-btn" value={data._id} onClick={decrementQty}>-</button>}
                    {data.qty} <button className="qty-btn" value={data._id} onClick={incrementQty}>+</button>
                </div>
            </div>
            <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
        />
        </div>)
}