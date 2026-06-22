
import React, { useState ,useEffect } from "react";
import {toast ,ToastContainer} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; 

const ExpenseReport = () => {
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const userId = localStorage.getItem('userId');
const [expenses, setExpenses] = useState([]);
const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        }
    }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`https://daily-expense-tracker-fullstack-website-2.onrender.com/api/search_expense/${userId}/?from=${fromDate}&to=${toDate}`);

       const data = await response.json();
        setExpenses(data.expenses);
        setGrandTotal(data.total);
    } 
    
    catch (error) {
        console.error("Error fetching expenses:", error);
        toast.error("Something went wrong. Please try again.");
    }   
        
};  
  return (
  
  <div className="container py-4">

    {/* Header */}

    <div
      className="card border-0 shadow-lg rounded-4 mb-4"
      style={{
        background:
          "linear-gradient(135deg,#0F172A,#1E40AF)",
      }}
    >
      <div className="card-body text-center text-white py-4">
        <h2 className="fw-bold">
          <i className="fas fa-file-invoice-dollar me-2"></i>
          Expense Report
        </h2>

        <p className="mb-0">
          Search and analyze your expenses between selected dates.
        </p>
      </div>
    </div>

    {/* Search Card */}

    <div className="card border-0 shadow-lg rounded-4 mb-4">
      <div className="card-body p-4">

        <form className="row g-3" onSubmit={handleSubmit}>

          <div className="col-md-5">

            <label className="form-label fw-semibold">
              From Date
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-calendar-alt"></i>
              </span>

              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

          </div>

          <div className="col-md-5">

            <label className="form-label fw-semibold">
              To Date
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-calendar-alt"></i>
              </span>

              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

          </div>

          <div className="col-md-2 d-flex align-items-end">

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill"
            >
              <i className="fas fa-search me-2"></i>
              Search
            </button>

          </div>

        </form>

      </div>
    </div>

    

    {/* Report Table */}

    <div className="card border-0 shadow-lg rounded-4">
      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Expense Item</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>

              {expenses.length > 0 ? (
                expenses.map((exp, index) => (
                  <tr key={exp.id}>

                    <td>
                      <span className="badge bg-primary">
                        {index + 1}
                      </span>
                    </td>

                    <td>{exp.ExpenseDate}</td>

                    <td>
                      <i className="fas fa-receipt text-primary me-2"></i>
                      {exp.ExpenseItem}
                    </td>

                    <td>
                      <span className="badge bg-success fs-6">
                        ₹{exp.ExpenseCost}
                      </span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-5"
                  >
                    <i className="fas fa-folder-open fa-3x text-muted"></i>

                    <h5 className="mt-3 text-muted">
                      No Expenses Found
                    </h5>
                  </td>
                </tr>
              )}

            </tbody>

            <tfoot className="table-light">

              <tr>
                <td
                  colSpan="3"
                  className="text-end fw-bold"
                >
                  Grand Total
                </td>

                <td>
                  <span className="badge bg-success fs-6">
                    ₹{grandTotal}
                  </span>
                </td>
              </tr>

            </tfoot>

          </table>

        </div>

      </div>
    </div>

    <ToastContainer />

  </div>

)
};

export default ExpenseReport;