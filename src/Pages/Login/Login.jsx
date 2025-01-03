import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Login = () => {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [userType, setUserType] = useState('option1'); // Default to 'option1'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const navigate = useNavigate();
  // Check if the user is already logged in by looking for a token
  useEffect(() => {
    const token = localStorage.getItem('token'); // Example of token stored in localStorage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
 
    // If user is already logged in, show a message
    if (isLoggedIn) {
      console.log('User is already logged in.');
      alert('User is already logged in.');
      return;
    }
 
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrPhone: input, password }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Network response was not ok');
      }
 
      const data = await response.json();
      console.log('Login Successful:', data);
 
// Wait for 4 seconds before redirecting
setTimeout(() => {
  navigate("/dashboardaccess");
}, 3000); // 3 seconds
 
      // Save token and update logged-in status
      localStorage.setItem('token', data.token); // Assuming token is returned in the response
      setIsLoggedIn(true); // Set user as logged in
      toast.success('Login Successful!');
    } catch (error) {
      toast.error('Error logging in:', error);
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false); // Set logged in status to false
    alert('Logged out successfully!');
  };
 
  return (
    <>
    <ToastContainer />
    <div id="pageWrapper">
      <main>
        <section className="introSec bg-lightGray  pb-xl-20  pb-lg-20 py-md-16 py-10  text-center">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 mb-lg-0 mb-6">
                <img src="artimages/LoginImg.webp" alt="image description" className="img-fluid" />
              </div>
              <div className="col-12 col-lg-6">
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <div className="container">
                    {isLoggedIn ? (
                      <div>
                        <h2>You are already logged in!</h2>
                        <button className="btn btn-danger" onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    ) : (
                      <form className="form px-4 pt-0" onSubmit={handleSubmit}>
                        <div className='login-heading mb-2 p-2 headingIV '>Login
                        </div>
                        <input
                          type="text"
                          name="emailOrPhone"
                          className="form-control mb-6 bg-light transparent-input"
                          placeholder="Email or Phone"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                        <input
                          type="password"
                          name="password"
                          className="form-control mb-6 bg-light transparent-input"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-success btn-block mb-6">Login</button>
                        <div className="row mb-6">
                          <div className="col d-flex justify-content-center">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="form2Example31"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                              />
                              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                          </div>
                          <div className="col">
                            <a href="#!">Forgot password?</a>
                          </div>
                        </div>
                        <div className="text-center">
                          <p>Not a member? <a href="register.html">Register</a></p>
                          <p>or sign up with:</p>
                          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f text-success"></i>
                          </button>
                          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google text-success"></i>
                          </button>
                          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter text-success"></i>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
};
 
export default Login;