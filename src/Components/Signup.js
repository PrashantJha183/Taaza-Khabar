import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log("Signup response: ", json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  document.title = "Taaza-Khabar - Register";

  return (
    <>
      <div className="container">
        <h1 className="text-center">REGISTER</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
                autoComplete="off"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-outline-success my-3" type="submit">
              Submit
            </button>
          </div>
          <div className="text-center">
            <Link to="/login" style={{ textDecoration: "none", color: "#000" }}>
              Already have an account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
