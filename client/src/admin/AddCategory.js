import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then(data => {
      if (data) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const handleInput = e => {
    setError("");
    setName(e.target.value);
  };

  const showSuccess = () => {
    if (success) {
      return <h3>{name}이 생성되었습니다. </h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3>{name}은 이미 존재하는 카테고리입니다.</h3>;
    }
  };

  const goBack = () => (
    <div>
      <Link to="/admin/dashboard"></Link>
    </div>
  );

  const newCategoryForm = () => (
    <>
      {showSuccess()}
      {showError()}
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" value={name} name="name" onChange={e => handleInput(e)} />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      {goBack()}
    </>
  );

  return (
    <Layout title="Add a new category" description={`${user.name}, ready to add a new category?`}>
      {newCategoryForm()}
    </Layout>
  );
};

export default AddCategory;
