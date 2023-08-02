import React, { useState } from "react";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

// Log In to get the Access Token
const LoginForm = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLoginIDChange = (e) => {
    setLoginId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      login_id: loginId,
      password: password,
    };

    const body = JSON.stringify(formData);

    // console.log(body);

    try {
      const response = await fetch(
        "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
          mode: "cors",
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      console.log("Authentication successful!");

      // Handling the response
      const data = await response.json();
      const token = data.access_token;

      // Storing the Bearer token in local storage
      localStorage.setItem("token", token);

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
            <h2 className="text-center">Login</h2>
            <div className="form-group">
              <input
                type="login_id"
                className="form-control"
                placeholder="Login Id"
                value={loginId}
                onChange={handleLoginIDChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
