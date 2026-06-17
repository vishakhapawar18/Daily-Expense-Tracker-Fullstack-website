import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/expense-dashboard.png";

const Home = () => {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <div
        className="container-fluid"
        style={{
          background: "linear-gradient(to right,#eef2ff,#f8fafc)",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5">

          {/* Hero Section */}
          <div className="row align-items-center py-5">

            <div className="col-lg-6">
              <span className="badge bg-primary px-3 py-2 mb-3">
                Smart Expense Management
              </span>

              <h1
                className="fw-bold display-4 lh-1"
                style={{ color: "#1e293b" }}
              >
                Track Your Daily Expenses
                <span className="text-primary"> Effortlessly</span>
              </h1>

              <p className="lead text-secondary mt-3" style={{ maxWidth: "500px" }}>
                Manage your spending, monitor budgets and generate
                insightful reports with our powerful expense tracker.
              </p>

              <div className="mt-4">
                {userId ? (
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-lg rounded-pill px-4"
                  >
                    <i className="fas fa-chart-line me-2"></i>
                    Go To Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="btn btn-success btn-lg rounded-pill px-4 me-3"
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      Sign Up
                    </Link>

                    <Link
                      to="/login"
                      className="btn btn-outline-dark btn-lg rounded-pill px-4"
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">
  <img
    src={heroImage}
    alt="Expense Dashboard"
    className="img-fluid"
    style={{
      maxHeight: "520px",
      width: "100%",
      objectFit: "contain",
    }}
  />
</div>

          </div>

          {/* Statistics Cards */}

          <div className="row g-4 mb-2">

            <div className="col-md-4">
              <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
                <i className="fas fa-wallet text-primary fs-1"></i>
                <h3 className="fw-bold mt-3">₹50K+</h3>
                <p className="text-muted">Expenses Managed</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
                <i className="fas fa-piggy-bank text-success fs-1"></i>
                <h3 className="fw-bold mt-3">₹20K+</h3>
                <p className="text-muted">Savings</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
                <i className="fas fa-chart-line text-warning fs-1"></i>
                <h3 className="fw-bold mt-3">98%</h3>
                <p className="text-muted">Accuracy</p>
              </div>
            </div>

            

          </div>

          {/* Pie Chart Section */}

          <div className="card border-0 shadow-lg rounded-4 p-5 mb-5">

            <h2 className="text-center fw-bold mb-4">
              Expense Distribution
            </h2>

            <div className="text-center">
              <i
                className="fas fa-chart-pie"
                style={{
                  fontSize: "180px",
                  color: "#2563EB",
                }}
              ></i>
            </div>

            <div className="row text-center mt-4">

              <div className="col-md-3">
                <span className="badge bg-primary p-2">
                  Food 40%
                </span>
              </div>

              <div className="col-md-3">
                <span className="badge bg-success p-2">
                  Travel 25%
                </span>
              </div>

              <div className="col-md-3">
                <span className="badge bg-warning text-dark p-2">
                  Shopping 20%
                </span>
              </div>

              <div className="col-md-3">
                <span className="badge bg-danger p-2">
                  Others 15%
                </span>
              </div>

            </div>

          </div>

          {/* Features */}

          <div className="py-5">
            <h2 className="text-center fw-bold mb-5">
              Why Choose Our Expense Tracker?
            </h2>

            <div className="row g-4">

              <div className="col-md-4">
                <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
                  <i className="fas fa-plus-circle text-primary fs-1"></i>
                  <h4 className="mt-3">Quick Expense Entry</h4>
                  <p>Add expenses in seconds.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
                  <i className="fas fa-chart-pie text-success fs-1"></i>
                  <h4 className="mt-3">Smart Reports</h4>
                  <p>Analyze spending with beautiful charts.</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
                  <i className="fas fa-lock text-danger fs-1"></i>
                  <h4 className="mt-3">Secure Data</h4>
                  <p>Your records are safe and protected.</p>
                </div>
              </div>

            </div>
          </div>

          {/* CTA Section */}

          <div
            className="text-center text-white p-5 rounded-4 my-5"
            style={{
              background:
                "linear-gradient(135deg,#2563EB,#7C3AED)",
            }}
          >
            <h2 className="fw-bold">
              Start Managing Your Expenses Today
            </h2>

            <p className="lead">
              Take control of your finances with smarter expense tracking.
            </p>

            {!userId && (
              <Link
                to="/signup"
                className="btn btn-warning btn-lg rounded-pill px-5"
              >
                Get Started 
              </Link>
            )}
          </div>

        </div>
      </div>

      
    </>
  );
};

export default Home;