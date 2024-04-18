import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span>
              <img
                src="IMG-20240413-WA0009.jpg"
                alt=""
                style={{ height: "5vh", borderRadius: "75px" }}
              />
            </span>
            Taaza-Khabar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") && (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/business" ? "active" : ""
                      }`}
                      to="/business"
                    >
                      Business
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/entertainment" ? "active" : ""
                      }`}
                      to="/entertainment"
                    >
                      Entertainment
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/health" ? "active" : ""
                      }`}
                      to="/health"
                    >
                      Health
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/science" ? "active" : ""
                      }`}
                      to="/science"
                    >
                      Science
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/sports" ? "active" : ""
                      }`}
                      to="/sports"
                    >
                      Sports
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/technology" ? "active" : ""
                      }`}
                      to="/technology"
                    >
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${
                        location.pathname === "/savednews" ? "active" : ""
                      }`}
                      to="/savednews"
                    >
                      Bookmark
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {!localStorage.getItem("token") && (
              <Link
                className="btn btn-outline-success"
                type="submit"
                role="button"
                to="/login"
              >
                Login
              </Link>
            )}
            {localStorage.getItem("token") && (
              <button
                className="btn btn-outline-danger"
                type="submit"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
