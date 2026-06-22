
import React, { useState ,useEffect } from "react";
import {toast ,ToastContainer} from 'react-toastify';
import {  useNavigate } from "react-router-dom";
import{useFetcher} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 

const ManageExpense = () => {
   
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    
        useEffect(() => {
            if (!userId) {
                navigate("/login");
            }
            fetchExpenses(userId);
        }, []);



    const [editExpense, seteditExpense] = useState(null);  
    const handleEdit = (expense) => {
        seteditExpense(expense);
    }

    const handleChange = (e) => {
    seteditExpense({
      ...editExpense,
      [e.target.name]: e.target.value,
    });
  };

     
  const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}/`);
            const data = await response.json();
            setExpenses(data);
        }
        catch (error) {
                console.error("Error fetching expenses:", error);
            }  
        };

    const handleUpdate = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000-tracker-fullstack-website-2.onrender.com/api/update_expense/${editExpense.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editExpense)
            });
            if (response.status === 200) {
                toast.success("Expense updated successfully!");
                seteditExpense(null);
                fetchExpenses(userId);
            }
            else {                
              toast.error("Failed to update expense. Please try again.");
            }
        }
        catch (error) {
                console.error("Error updating expenses:", error);
                toast.error('something went wrong. Please try again.');
            }  
        };

    const handleDelete = async (expense_id) => {
      if(window.confirm("Are you sure you want to delete this expense?")) {
        try {
            const response = await fetch(`http://127.0.0.1:8000-tracker-fullstack-website-2.onrender.com/api/delete_expense/${expense_id}/`, {
                method: 'DELETE',
                
            });
            if (response.status === 200) {
                toast.success("Expense deleted successfully!");
                fetchExpenses(userId);
            }
            else {                
              toast.error("Failed to delete expense. Please try again.");
            }
        }
        catch (error) {
                console.error("Error deleting expenses:", error);
                toast.error('something went wrong. Please try again.');
            }
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
        <h2 className="fw-bold mb-2">
          <i className="fas fa-tasks me-2"></i>
          Manage Expenses
        </h2>

        <p className="mb-0">
          View, update and manage all your expense records.
        </p>
      </div>
    </div>

    {/* Expense Table */}

    <div className="card border-0 shadow-lg rounded-4">
      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Expense Item</th>
                <th>Cost</th>
                <th>Action</th>
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

                    <td>

                      <button
                        className="btn btn-warning btn-sm rounded-pill me-2"
                        onClick={() => handleEdit(exp)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm rounded-pill"
                        onClick={() => handleDelete(exp.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-5"
                  >
                    <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>

                    <h5 className="text-muted mt-3">
                      No Expenses Found
                    </h5>

                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>

    {/* Edit Modal */}

    {editExpense && (

      <div
        className="modal show d-block"
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content border-0 shadow-lg rounded-4">

            <div
              className="modal-header text-white border-0"
              style={{
                background:
                  "linear-gradient(135deg,#4F46E5,#7C3AED)",
              }}
            >
              <h5 className="modal-title">
                <i className="fas fa-edit me-2"></i>
                Update Expense
              </h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => seteditExpense(null)}
              ></button>
            </div>

            <div className="modal-body p-4">

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="fas fa-calendar-alt text-primary me-2"></i>
                  Expense Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="ExpenseDate"
                  value={editExpense.ExpenseDate}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="fas fa-shopping-cart text-success me-2"></i>
                  Expense Item
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="ExpenseItem"
                  value={editExpense.ExpenseItem}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="fas fa-rupee-sign text-danger me-2"></i>
                  Expense Cost
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="ExpenseCost"
                  value={editExpense.ExpenseCost}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="modal-footer border-0">

              <button
                className="btn btn-secondary rounded-pill px-4"
                onClick={() => seteditExpense(null)}
              >
                Close
              </button>

              <button
                className="btn btn-success rounded-pill px-4"
                onClick={() => handleUpdate(userId)}
              >
                <i className="fas fa-save me-2"></i>
                Save
              </button>

            </div>

          </div>

        </div>
      </div>

    )}

    <ToastContainer />

  </div>

  )
};

export default ManageExpense;