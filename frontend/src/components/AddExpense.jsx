import React, { useState ,useEffect } from "react";
import {toast ,ToastContainer} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; 

const AddExpense = () => {
  const [formData, setFormData] = useState({
    ExpenseDate: "",
    ExpenseItem: "",
    ExpenseCost: "",
  });
  const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        }
    }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("https://daily-expense-tracker-fullstack-website-2.onrender.com/api/add_expense/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, UserId: userId }),
        });

       const data = await response.json();
        if (response.status === 201) {
            toast.success(data.message);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } else {
            
            toast.error(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.");
    }   
        
};   
            
    

  return (
  <div className="container py-4">

    {/* Header Banner */}

    <div
      className="card border-0 shadow-lg rounded-4 mb-4"
      style={{
        background:
          "linear-gradient(135deg,#0F172A,#1E40AF)",
      }}
    >
      <div className="card-body text-center text-white py-4">
        <h2 className="fw-bold">
          <i className="fas fa-wallet me-2"></i>
          Add Expense
        </h2>

        <p className="mb-0">
          Record your daily expenses and keep your finances organized.
        </p>
      </div>
    </div>

    <div className="row justify-content-center">

      <div className="col-lg-6">

        <div className="card border-0 shadow-lg rounded-4">

          <div className="card-body p-4">

            <form onSubmit={handleSubmit}>

              {/* Expense Date */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  <i className="fas fa-calendar-alt text-primary me-2"></i>
                  Expense Date
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="fas fa-calendar-day"></i>
                  </span>

                  <input
                    type="date"
                    className="form-control"
                    name="ExpenseDate"
                    value={formData.ExpenseDate}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Expense Item */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  <i className="fas fa-shopping-cart text-success me-2"></i>
                  Expense Item
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="fas fa-receipt"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    name="ExpenseItem"
                    placeholder="Food, Transport, Shopping..."
                    value={formData.ExpenseItem}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Expense Cost */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  <i className="fas fa-rupee-sign text-danger me-2"></i>
                  Expense Amount
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    ₹
                  </span>

                  <input
                    type="number"
                    className="form-control"
                    name="ExpenseCost"
                    placeholder="Enter Amount"
                    value={formData.ExpenseCost}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Info Box */}

              <div
                className="alert alert-primary border-0 rounded-3"
                role="alert"
              >
                <i className="fas fa-lightbulb me-2"></i>
                Track every expense regularly to maintain better financial control.
              </div>

              {/* Button */}

              <div className="d-grid">

                <button
                  type="submit"
                  className="btn btn-lg text-white fw-bold rounded-pill"
                  style={{
                    background:
                      "linear-gradient(135deg,#0F172A,#1E40AF)",
                  }}
                >
                  <i className="fas fa-plus-circle me-2"></i>
                  Add Expense
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

    <ToastContainer position="top-center" />

  </div>
);
}
export default AddExpense;