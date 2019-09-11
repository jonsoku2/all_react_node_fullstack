import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../config";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, error, success, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();
  const handleChange = e => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    try {
      const response = await Axios.post(`${API}/signin`, values);
      authenticate(response.data, () => {
        setValues({
          ...values,
          redirectToReferrer: true
        });
      });
    } catch (err) {
      setValues({
        ...values,
        loading: false,
        error: err.response.data.errors
      });
    }
  };

  const showError = () => <div style={{ display: error ? "" : "none" }}>{error}</div>;

  const showLoading = () =>
    loading && (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/"></Redirect>;
    }
  };
  const signInForm = () => (
    <form onSubmit={e => handleSubmit(e)}>
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
    <Layout title="Sign In" description="Welcome to Tamastudy">
      {signInForm()}
      {showError()}
      {showLoading()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
