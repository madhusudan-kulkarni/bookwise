import { useDataContext } from "../context/dataContext";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Profile() {
  const {
    dispatch,
    state: { foundUser },
    addresses,
    setAddresses,
  } = useDataContext();
  const [loader, setLoader] = useState(true);
  const [profileData, setProfileData] = useState(true);
  const [toggleAddressForm, setToggleAddressForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [showEditAddressForm, setShowEditAddressForm] = useState(false);
  let newAddress = { firstName: "", zipcode: "", city: "", state: "" };

  const notify = (message) => {
    toast(message, {
      position: "bottom-right",
      className: "toast-message",
    });
  };

  const updateNewAddress = (event) => {
    event.preventDefault();
    [...event.target.elements].forEach((element, index) => {
      if (index < 5) {
        newAddress[element.id] = element.value;
      }
    });
    setAddresses([...addresses, newAddress]);
    setToggleAddressForm(false);
    event.target.reset();
    notify("New Address Added");
  };

  const deleteAddress = (event) => {
    setAddresses(() =>
      addresses.filter((address, index) => index !== Number(event.target.value))
    );
    notify("Address Deleted");
  };

  const editAddress = (event) => {
    [...event.target.elements].forEach((element, index) => {
      if (index < 5) {
        newAddress[element.name] = element.value;
      }
    });
    const findIndex = addresses.findIndex(
      (address) => address.firstName === editData.firstName
    );
    setAddresses(
      [...addresses],
      (addresses[findIndex].firstName = newAddress.firstName),
      (addresses[findIndex].zipcode = newAddress.zipcode),
      (addresses[findIndex].city = newAddress.city),
      (addresses[findIndex].state = newAddress.state)
    );
    event.preventDefault();
    setShowEditAddressForm(false);
    event.target.reset();
    notify("Address Updated");
  };

  const editAddressBtn = (event) => {
    const addressToBeEdited = addresses[event.target.value];
    setEditData(addressToBeEdited);
    setShowEditAddressForm(!showEditAddressForm);
  };

  const profileContent = (
    <div className="profile-information">
      <p>
        Name: {foundUser.firstName} {foundUser.lastName}
      </p>
      <p>Email: {foundUser.email}</p>
      <button
        className="logout-btn"
        onClick={() => dispatch({ type: "Logout" })}
      >
        Logout
      </button>
    </div>
  );

  const addressesContent = (
    <div className="address-information">
      <div className="add-address-container">
        <button
          className="logout-btn"
          onClick={() => {
            setToggleAddressForm(!toggleAddressForm);
          }}
        >
          {toggleAddressForm ? "Close" : "Add New Address +"}
        </button>
        <form
          style={{ display: toggleAddressForm ? "flex" : "none" }}
          className="address-form-container"
          onSubmit={updateNewAddress}
          action=""
        >
          <p style={{ textDecorationLine: "underline" }}>
            Fill New Address Details
          </p>
          <input
            required
            type="text"
            className="address-form-input"
            id="firstName"
            placeholder="Name"
          ></input>
          <input
            required
            type="number"
            className="address-form-input"
            id="zipcode"
            placeholder="Zipcode"
          ></input>
          <input
            required
            type="text"
            className="address-form-input"
            id="city"
            placeholder="City"
          ></input>
          <input
            required
            type="text"
            className="address-form-input"
            id="state"
            placeholder="State"
          ></input>{" "}
          <br />
          <button type="submit" className="form-btn">
            Save
          </button>
        </form>
      </div>
      <div
        className="edit-address-form"
        style={{ display: showEditAddressForm ? "flex" : "none" }}
      >
        <p style={{ textDecorationLine: "underline" }}>Edit Address</p>
        <form action="" onSubmit={editAddress}>
          <input
            type="text"
            className="address-form-input"
            name="firstName"
            defaultValue={editData.firstName}
          ></input>
          <input
            type="number"
            className="address-form-input"
            name="zipcode"
            defaultValue={editData.zipcode}
          ></input>
          <input
            type="text"
            className="address-form-input"
            name="city"
            defaultValue={editData.city}
          ></input>
          <input
            type="text"
            className="address-form-input"
            name="state"
            defaultValue={editData.state}
          ></input>
          <button type="submit" className="form-btn">
            Update
          </button>
        </form>
      </div>
      {addresses.map((address, index) => (
        <div key={index}>
          <h1>{address.firstName}</h1>
          <p>Zipcode: {address.zipcode}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <div>
            <button
              className="logout-btn"
              value={index}
              onClick={editAddressBtn}
            >
              Edit
            </button>
            <button
              className="logout-btn"
              value={index}
              onClick={deleteAddress}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

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
    <div className="profile-container">
      <div className="inner-profile-container">
        <div className="profile-header">
          <div
            style={{
              backgroundColor: profileData
                ? "#0e4fa4"
                : "rgba(255,255,255,20%)",
              color: profileData ? "white" : "",
              cursor: "pointer",
            }}
            className="profile-info"
            onClick={() => setProfileData(true)}
          >
            Profile
          </div>
          <div
            style={{
              backgroundColor: profileData
                ? "rgba(255,255,255,20%)"
                : "#0e4fa4",
              color: profileData ? "" : "white",
              cursor: "pointer",
            }}
            className="addresses-info"
            onClick={() => setProfileData(false)}
          >
            Addresses
          </div>
        </div>
        <div>{profileData ? profileContent : addressesContent}</div>
      </div>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        pauseOnHover={false}
      />
    </div>
  );
}
