
import React, { useState ,useEffect } from "react";
import {toast ,ToastContainer} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; 

const ChangePassword = () => {
     const navigate = useNavigate();
     const userId = localStorage.getItem("userId");

      const [formData,setFormData] =useState({ 
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      useEffect(() => {
                  if (!userId) {
                      navigate("/login");
                  }
                  
              }, []);
      
    
      const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
      };


        const handleSubmit = async (e) => {
            e.preventDefault();

        if(formData.newPassword !== formData.confirmPassword){
           toast.error('New password and confirm password do not match.');
           return;
        }
       try{
       const response = await fetch(`https://daily-expense-tracker-fullstack-website-2.onrender.com/api/change_password/${userId}/`,{
          method : 'POST',
          headers :{ 'Content-Type':'application/json' },
          body : JSON.stringify({
            oldPassword: formData.oldPassword, 
            newPassword: formData.newPassword}),
        });
        const data = await response.json();
        if(response.status === 200) {
           toast.success(data.message);
              setFormData({oldPassword:'',newPassword:'',confirmPassword:''});
        }
        else{
           
           toast.error(data.message);
           
        }}
    catch (error){
      console.error('Error:',error);
      toast.error('something went wrong. try again.');

    }
  };
  return (
    
  <div className="container py-4">

    {/* Header Banner */}

    <div
      className="card border-0 shadow-lg rounded-4 mb-"
      style={{
        background: "linear-gradient(135deg,#0F172A,#1E40AF)",
      }}
    >
      <div className="card-body text-center text-white py-4">
        <h2 className="fw-bold">
          <i className="fas fa-key me-2"></i>
          Change Password
        </h2>

        <p className="mb-2">
          Secure your account with a stronger password and keep your data safe.
        </p>
      </div>
    </div>

    <div className="row justify-content-center">

      <div className="col-lg-6">

        <div className="card border-0 shadow-lg rounded-4">

          <div className="card-body p-4">

            <form onSubmit={handleSubmit}>

              {/* Old Password */}

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-lock text-primary me-2"></i>
                  Old Password
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>

                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    placeholder="Enter Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* New Password */}

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-key text-success me-2"></i>
                  New Password
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-lock-open"></i>
                  </span>

                  <input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="Enter New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="fas fa-shield-alt text-danger me-2"></i>
                  Confirm Password
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-check-circle"></i>
                  </span>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Security Note */}

              <div
                className="alert alert-info border-0 rounded-3"
                role="alert"
              >
                <i className="fas fa-info-circle me-2"></i>
                Use at least 8 characters with letters, numbers and symbols
                for better security.
              </div>

              {/* Buttons */}

              <div className="d-grid gap-2">

                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill"
                >
                  <i className="fas fa-save me-2"></i>
                  Update Password
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

    <ToastContainer />

  </div>
);
}
export default ChangePassword;