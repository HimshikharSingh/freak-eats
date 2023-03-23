import React, { useState } from "react";
import Navbar from "../componenets/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials!");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
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
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
