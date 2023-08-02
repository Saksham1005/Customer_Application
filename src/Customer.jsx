import React from "react";
import { useHistory } from "react-router-dom";
import "./Customer.css";

// Customer Component
const Customer = ({ customer }) => {
  const history = useHistory();

  const handleUpdate = () => {
    // Redirect to the update form page with customer details
    history.push({
      pathname: "/customer-update",
      state: { customerData: customer },
    });
  };

  const handleDelete = async () => {
    const bearerToken = localStorage.getItem("token");
    const uuid = customer.uuid;

    try {
      const response = await fetch(
        "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp?cmd=delete&uuid=" +
          uuid,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      // Handle the success scenario here
      console.log("Customer deleted successfully!");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <tr className="customer-row">
      <td className="customer-data">{customer.firstName}</td>
      <td className="customer-data">{customer.lastName}</td>
      <td className="customer-data">{customer.address}</td>
      <td className="customer-data">{customer.city}</td>
      <td className="customer-data">{customer.state}</td>
      <td className="customer-data">{customer.email}</td>
      <td className="customer-data">{customer.phone}</td>
      <td className="customer-data">
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default Customer;
