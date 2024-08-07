import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Taaza-Khabar - Login";
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <img
        src="Taaza_Khabar.webp"
        alt="Nothing"
        style={{
          height: "92vh",
          width: "99vw",
          opacity: "0.5",
          zIndex: "-1",
          position: "absolute",
        }}
      />
      <div
        className="container my-5 py-5"
        style={{
          background: "transparent",
          fontWeight: "bold",
          fontSize: "1.2em",
        }}
      >
        <h1 className="text-center">LOGIN</h1>

        <form method="post" onSubmit={handleSubmit}>
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
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword1">Password</label>
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
                type="button"
                className="btn btn-outline-secondary"
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
        </form>
        <div className="text-center">
          <Link to="/signup" style={{ textDecoration: "none", color: "#000" }}>
            Don't have an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
