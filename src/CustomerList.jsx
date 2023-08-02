import React, { useState, useEffect } from "react";
import Customer from "./Customer";
import { useHistory } from "react-router-dom";
import "./CustomerList.css";

// Customer List
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const bearerToken = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    fetch(
      "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddCustomer = () => {
    history.push("/customer-detail");
  };

  return (
    <div className="customer-list-container">
      <h2 className="customer-list-title">Customer List</h2>
      <button className="add-customer-button" onClick={handleAddCustomer}>
        Add Customer
      </button>

      <table className="customer-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <Customer key={customer.id} customer={customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
