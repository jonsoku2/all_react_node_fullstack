import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../config";
import { Link } from "react-router-dom";
import Axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = e => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await Axios.post(`${API}/signup`, values).then(
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        })
      );
    } catch (err) {
      setValues({
        ...values,
        error: err.response.data.errors,
        success: false
      });
    }
  };

  const showError = () => <div style={{ display: error ? "" : "none" }}>{error}</div>;

  const showSuccess = () => (
    <div style={{ display: success ? "" : "none" }}>
      New account is created. Please <Link to="/signin">signin</Link>!
    </div>
  );

  const signUpForm = () => (
    <form onSubmit={e => handleSubmit(e)}>
      <div>
        <label htmlFor="">Name</label>
        <input value={name} name="name" onChange={e => handleChange(e)} type="text" />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input value={email} name="email" onChange={e => handleChange(e)} type="email" />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input value={password} name="password" onChange={e => handleChange(e)} type="password" />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );

  return (
    <Layout title="Sign up" description="Welcome to Tamastudy">
      {success === true ? "" : signUpForm()}
      {showSuccess()}
      {showError()}
    </Layout>
  );
};

export default Signup;
