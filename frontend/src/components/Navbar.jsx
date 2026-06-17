import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background:
          "linear-gradient(135deg,#0F172A,#1E3A8A,#2563EB)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        padding: "10px 0",
      }}
    >
      <div className="container">

        {/* Logo */}

        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
        >
          <div
            className="me-2 d-flex justify-content-center align-items-center"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg,#FACC15,#F59E0B)",
              color: "#111827",
            }}
          >
            <i className="fas fa-wallet"></i>
          </div>

          <div>
            <div
              style={{
                fontSize: "20px",
                lineHeight: "20px",
              }}
            >
              Daily Expense
            </div>

            <small
              style={{
                color: "#CBD5E1",
                fontSize: "11px",
              }}
            >
              Smart Finance Manager
            </small>
          </div>
        </Link>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link
                className="nav-link fw-semibold px-3"
                to="/"
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>

            {userId ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold px-3"
                    to="/dashboard"
                  >
                    <i className="fas fa-chart-line me-1"></i>
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold px-3"
                    to="/add-expense"
                  >
                    <i className="fas fa-plus-circle me-1"></i>
                    Add Expense
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold px-3"
                    to="/manage-expense"
                  >
                    <i className="fas fa-list me-1"></i>
                    Manage
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold px-3"
                    to="/expense-report"
                  >
                    <i className="fas fa-file-invoice-dollar me-1"></i>
                    Reports
                  </Link>
                </li>

                {/* Profile Dropdown */}

                <li className="nav-item dropdown ms-3">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <div
                      className="rounded-circle d-flex justify-content-center align-items-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background:
                          "linear-gradient(135deg,#FACC15,#F59E0B)",
                        color: "#111827",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      {userName
                        ? userName.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  </a>

                  <ul
                    className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4"
                    style={{ minWidth: "230px" }}
                  >
                    <li className="px-3 py-3 border-bottom">
                      <h6 className="fw-bold mb-1">
                        {userName}
                      </h6>

                      <small className="text-muted">
                        Daily Expense Tracker
                      </small>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item py-2"
                        to="/dashboard"
                      >
                        <i className="fas fa-chart-line me-2 text-primary"></i>
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item py-2"
                        to="/change-password"
                      >
                        <i className="fas fa-key me-2 text-warning"></i>
                        Change Password
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger py-2"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-light rounded-pill px-4 me-2"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn rounded-pill px-4 fw-semibold"
                    to="/signup"
                    style={{
                      background: "#FACC15",
                      color: "#111827",
                    }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;