import React from 'react'
import { useState ,useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import {Pie} from 'react-chartjs-2';
import {Chart , ArcElement, Tooltip, Legend} from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const[expenses,setExpenses]=useState([]);
  const[todayTotal, setTodayTotal] = useState(0);
  const[yesterdayTotal, setYesterdayTotal] = useState(0);
  const[last7DaysTotal, setLast7DaysTotal] = useState(0);
  const[last30DaysTotal, setLast30DaysTotal] = useState(0);
  const[currentYearTotal, setCurrentYearTotal] = useState(0);
  const[grandTotal, setGrandTotal] = useState(0);


  const pieData = {
    labels : expenses.map(exp => exp.ExpenseItem),
    datasets : [
      {
      label : 'Expense Cost',
      data : expenses.map(exp => parseFloat(exp.ExpenseCost)),
      backgroundColor : ['red','blue','#00ff00','rgba(80,20,40,0.3','rgba(255, 206, 86, 0.7)', 'grey'
       ],
      borderWidth : 1
      },
      
    ],
  }

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    fetchExpenses(userId);
  }, []);

  const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`https://daily-expense-tracker-fullstack-website-2.onrender.com/api/manage_expense/${userId}/`);
            const data = await response.json();
            setExpenses(data);
            calculateTotals(data);
        }
        catch (error) {
                console.error("Error fetching expenses:", error);
            }  
        };
      
        const calculateTotals = (data) => {
          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          const last7Days = new Date();
          last7Days.setDate(today.getDate() - 7);
          const last30Days = new Date();
           last30Days.setDate(today.getDate() - 30);
           const currentYear = today.getFullYear();

           let todaySum = 0, yesterdaySum = 0, last7Sum = 0, last30Sum = 0, yearSum = 0, grandSum = 0;
           data.forEach(item=> {
              const expenseDate = new Date(item.ExpenseDate);
              const amount = parseFloat(item.ExpenseCost) || 0;

              if(expenseDate.toDateString() === today.toDateString()) {todaySum = todaySum + amount}
              if(expenseDate.toDateString() === yesterday.toDateString()) {yesterdaySum = yesterdaySum + amount}
              if (expenseDate >= last7Days && expenseDate <= today) {last7Sum += amount}
              if (expenseDate >= last30Days && expenseDate <= today) { last30Sum += amount}
              if(expenseDate.getFullYear() === currentYear) {yearSum = yearSum + amount}
              grandSum = grandSum + amount;
           })

           setTodayTotal(todaySum);
           setYesterdayTotal(yesterdaySum);
           setLast7DaysTotal(last7Sum);
           setLast30DaysTotal(last30Sum);
           setCurrentYearTotal(yearSum);
           setGrandTotal(grandSum);

}


return (
    
  <div
    className="container-fluid py-4"
    style={{
      background: "#f8fafc",
      minHeight: "100vh",
    }}
  >
    {/* Welcome Banner */}

    <div
  className="card border-0 shadow-lg rounded-4 mb-4 overflow-hidden"
  style={{
    background: "linear-gradient(135deg,#0F172A,#1E40AF)",
  }}
>
  <div className="card-body p-4">

    <div className="row align-items-center">

      <div className="col-lg-8">
        <h2 className="fw-bold text-white mb-2">
           Welcome , {userName}
        </h2>

        <p
          className="mb-4"
          style={{
            color: "#cbd5e1",
            fontSize: "16px",
          }}
        >
          Monitor your expenses, analyze spending habits and
          manage your finances smarter than ever.
        </p>

        

        
      </div>

      <div className="col-lg-4 text-center d-none d-lg-block">
        <i
          className="fas fa-chart-pie"
          style={{
            fontSize: "110px",
            color: "rgba(255,255,255,0.15)",
          }}
        ></i>
      </div>

    </div>

  </div>
</div>
    {/* Statistics Cards */}

    <div className="row g-4">

      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow rounded-4 h-100">
          <div className="card-body text-center">
            <i className="fas fa-calendar-day text-primary fs-1"></i>
            <h5 className="mt-3">Today's Expense</h5>
            <h2 className="fw-bold text-primary">
              ₹{todayTotal}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow rounded-4 h-100">
          <div className="card-body text-center">
            <i className="fas fa-calendar-minus text-success fs-1"></i>
            <h5 className="mt-3">Yesterday</h5>
            <h2 className="fw-bold text-success">
              ₹{yesterdayTotal}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow rounded-4 h-100">
          <div className="card-body text-center">
            <i className="fas fa-calendar-week text-warning fs-1"></i>
            <h5 className="mt-3">Last 7 Days</h5>
            <h2 className="fw-bold text-warning">
              ₹{last7DaysTotal}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow rounded-4 h-100">
          <div className="card-body text-center">
            <i className="fas fa-calendar-alt text-secondary fs-1"></i>
            <h5 className="mt-3">Last 30 Days</h5>
            <h2 className="fw-bold text-secondary">
              ₹{last30DaysTotal}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div className="card border-0 shadow rounded-4 h-100">
          <div className="card-body text-center">
            <i className="fas fa-chart-line text-danger fs-1"></i>
            <h5 className="mt-3">Current Year</h5>
            <h2 className="fw-bold text-danger">
              ₹{currentYearTotal}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6">
        <div
          className="card border-0 shadow rounded-4 h-100 text-white"
          style={{
            background:
              "linear-gradient(135deg,#2563EB,#7C3AED)",
          }}
        >
          <div className="card-body text-center">
            <i className="fas fa-wallet fs-1"></i>
            <h5 className="mt-3">Grand Total</h5>
            <h2 className="fw-bold">
              ₹{grandTotal}
            </h2>
          </div>
        </div>
      </div>

    </div>

    {/* Pie Chart + Recent Expense */}

    <div className="row mt-5">

      <div className="col-lg-6 mb-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">
          <div className="card-body">

            <h4 className="fw-bold text-center mb-4">
              Expense Distribution
            </h4>

            <div
              style={{
                width: "350px",
                margin: "auto",
              }}
            >
              <Pie data={pieData} />
            </div>

          </div>
        </div>

      </div>

      <div className="col-lg-6 mb-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">
          <div className="card-body">

            <h4 className="fw-bold mb-4">
              Recent Expenses
            </h4>

            <table className="table table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Cost</th>
                </tr>
              </thead>

              <tbody>

                {expenses.slice(0, 5).map((exp, index) => (
                  <tr key={index}>
                    <td>{exp.ExpenseDate}</td>
                    <td>{exp.ExpenseItem}</td>
                    <td>
                      <span className="badge bg-success">
                        ₹{exp.ExpenseCost}
                      </span>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>

      </div>

    </div>

    {/* Bottom Banner */}

    <div
      className="card border-0 shadow-lg rounded-4 mt-4"
      style={{
        background:
          "linear-gradient(135deg,#06B6D4,#2563EB)",
      }}
    >
      <div className="card-body text-center text-white py-5">
        <h3 className="fw-bold">
          Keep Tracking Your Expenses 📊
        </h3>

        <p className="mb-0">
          Smart spending today creates a better future tomorrow.
        </p>
      </div>
    </div>

  </div>
)
}

export default Dashboard;