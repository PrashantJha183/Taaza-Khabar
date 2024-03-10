import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
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
      //save authToken and redirect to homepage and unlock all pages for the user
      localStorage.setItem("token", json.authToken);

      navigate("/");
      props.showAlert("Login successfully", "success");
    } else {
      //   alert("Invalid credentials");
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
