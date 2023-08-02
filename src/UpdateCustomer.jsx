import React, { useState } from "react";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

// Update Customer Details
const UpdateCustomer = ({ location }) => {
  const history = useHistory();

  const { customer } = location.state;

  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [address, setAddress] = useState(customer.address);
  const [city, setCity] = useState(customer.city);
  const [state, setState] = useState(customer.state);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the authentication token from the local storage
    const token = localStorage.getItem("token");

    const formData = {
      first_name: firstName,
      last_name: lastName,
      street,
      address,
      city,
      state,
      email,
      phone,
    };

    try {
      const response = await fetch(
        "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=update&uuid=" +
          customer.uuid,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      console.log("Customer updated successfully!");

      history.push("/customer-list");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="text-center">Customer Details</h2>
            <div className="grid">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  // required
                />
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
