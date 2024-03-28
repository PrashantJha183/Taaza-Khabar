import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");

    if (token && expiration) {
      const now = new Date().getTime();
      if (now > expiration) {
        // Token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        props.showAlert("Session expired. Please login again.", "warning");
      } else {
        // Token is still valid
        navigate("/");
      }
    }
  }, [navigate, props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log("json:", json);
    if (json.success) {
      // Save authToken and expiration time
      const now = new Date().getTime();
      const expiration = now + 30 * 60 * 1000; // 30 minutes expiration
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("expiration", expiration);

      navigate("/");
      props.showAlert("Login successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          {" "}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Link to="/signup">Don't have an account?</Link>
      </div>
    </>
  );
};

export default Login;
