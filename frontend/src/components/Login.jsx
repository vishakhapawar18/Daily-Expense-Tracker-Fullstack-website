
import React ,{useState} from 'react'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const Login = () => {
     const navigate = useNavigate();
      const [formData,setFormData] =useState({ 
        
        Email: '',
        Password: '',
      });
    
      const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           const response = await fetch("https://daily-expense-tracker-fullstack-website-2.onrender.com/api/login/",{
              method : 'POST',
              headers :{ 'Content-Type':'application/json' },
              body : JSON.stringify(formData),
            });
            const data = await response.json();
            if(response.status === 200) {
               toast.success('Login Successful!');
               localStorage.setItem('userId', data.userId);
               localStorage.setItem('userName', data.userName);
                setTimeout(() => {
                    navigate('/dashboard');
        
                },2000);
            }
            else{
            
               toast.error(data.message);
               
            }
    
    
        }
        catch (error){
          console.error('Error:',error);
          toast.error('something went wrong. try again.');
    
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
          <i className="fas fa-sign-in-alt me-2"></i>
          Login
        </h2>

        <p className="mb-0">
          Access your account and manage your expenses efficiently.
        </p>
      </div>
    </div>

    <div className="row justify-content-center">

      <div className="col-lg-5">

        <div className="card border-0 shadow-lg rounded-4">

          <div className="card-body p-4">

            <form onSubmit={handleSubmit}>

              {/* Email */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  <i className="fas fa-envelope text-primary me-2"></i>
                  Email Address
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>

                  <input
                    type="email"
                    name="Email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mb-3">

                <label className="form-label fw-semibold">
                  <i className="fas fa-lock text-danger me-2"></i>
                  Password
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>

                  <input
                    type="password"
                    name="Password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.Password}
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
                <i className="fas fa-shield-alt me-2"></i>
                Your account and expense data are securely protected.
              </div>

              {/* Login Button */}

              <div className="d-grid">

                <button
                  type="submit"
                  className="btn btn-lg text-white fw-bold rounded-pill"
                  style={{
                    background:
                      "linear-gradient(135deg,#0F172A,#1E40AF)",
                  }}
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login
                </button>

              </div>

              {/* Signup Link */}

              <div className="text-center mt-4">

                <span className="text-muted">
                  Don't have an account?
                </span>

                <button
                  type="button"
                  className="btn btn-link text-decoration-none fw-bold"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

    <ToastContainer
      position="top-right"
      autoClose={3000}
    />

  </div>
);
};

export default Login;