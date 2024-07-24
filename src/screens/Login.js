import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (response.ok) { // Check if the response status is OK (200)
        if (json.success) {
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken", json.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate("/"); // Redirect to homepage or desired route
        } else {
          setErrorMessage("Invalid credentials, please try again.");
        }
      } else {
        setErrorMessage("Failed to login, please try again later.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred, please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div>
          <Navbar />
        </div>
        <div className="container">
          <form
            className="w-50 m-auto mt-5 border bg-dark border-warning rounded"
            onSubmit={handleSubmit}
          >
            <div className="m-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/signup" className="m-3 btn btn-danger">
              Not a Registered User?
            </Link>
            {errorMessage && ( // Show error message if there is any
              <div className="m-3 alert alert-danger">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
