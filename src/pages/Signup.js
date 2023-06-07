import { useDataContext } from "../context/dataContext";
import { useNavigate } from "react-router";

export function Signup() {
  const { dispatch, setAddresses } = useDataContext();
  const navigate = useNavigate();
  let userData = { name: "", email: "", password: "" };

  const signupDataHandler = (event) => {
    userData[event.target.name] = event.target.value;
  };

  const createAccount = async () => {
    const response = await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        firstName: userData.name,
        address: [],
      }),
    });
    const { createdUser, encodedToken } = await response.json();
    dispatch({ type: "Login" });
    dispatch({ type: "userFound", payload: createdUser });
    localStorage.setItem("encodedToken", encodedToken);
    navigate("/store");
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h4 style={{ marginBottom: "1rem", color: "#0e4fa4" }}>Sign Up</h4>
        <div style={{ marginBottom: "1rem", color: "#0e4fa4" }}>
          <label>Name</label>
          <br />
          <input
            type="input"
            name="name"
            placeholder="Test User"
            className="loginInput"
            onChange={signupDataHandler}
          ></input>
        </div>
        <div style={{ marginBottom: "1rem", color: "#0e4fa4" }}>
          <label>Email Address</label>
          <br />
          <input
            type="input"
            name="email"
            placeholder="test@gmail.com"
            className="loginInput"
            onChange={signupDataHandler}
          ></input>
        </div>
        <div style={{ marginBottom: "1rem", color: "#0e4fa4" }}>
          <label>Password</label>
          <br />
          <input
            type="input"
            name="password"
            placeholder="*********"
            className="loginInput"
            onChange={signupDataHandler}
          ></input>
        </div>
        <button className="login-btn" onClick={createAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
}
