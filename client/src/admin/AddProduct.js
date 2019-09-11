import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shippping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const handleChange = e => {
    // var files = e.target.files; // FileList 객체
    // console.log(files); // { 0: File, 1: File, length: 2 }
    // console.log(files[0]);
    // a
    const value = e.target.name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({
      ...values,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      console.log(data.name);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newProductForm = () => (
    <form onSubmit={e => handleSubmit(e)}>
      <h4>product Photo</h4>
      <div>
        <label htmlFor="">
          <input onChange={e => handleChange(e)} type="file" name="photo" accept="image/*" />
        </label>
      </div>
      <div>
        <label htmlFor="">Name</label>
        <input onChange={e => handleChange(e)} type="text" value={name} name="name" />
      </div>
      <div>
        <label htmlFor="">Description</label>
        <input onChange={e => handleChange(e)} type="text" value={description} name="description" />
      </div>
      <div>
        <label htmlFor="">price</label>
        <input onChange={e => handleChange(e)} type="text" value={price} name="price" />
      </div>
      <div>
        <label htmlFor="">category</label>
        <select onChange={e => handleChange(e)} value={category} name="category">
          <option>선택해주세요</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label htmlFor="">shipping</label>
        <select onChange={e => handleChange(e)} value={shipping} name="shipping">
          <option>선택해주세요</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div>
        <label htmlFor="">quantity</label>
        <input onChange={e => handleChange(e)} type="number" value={quantity} name="quantity" />
      </div>
      <button>Create Product</button>
    </form>
  );
  const showError = () => <div style={{ display: error ? "" : "none" }}>{error}</div>;
  const showSuccess = () => (
    <div style={{ display: createdProduct ? "" : "none" }}>
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );
  const showLoading = () =>
    loading && (
      <div>
        <h2>loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add a new Product!"
      description={`G'day ${user.name}, ready to add a new product!`}
    >
      {showLoading()}
      {showSuccess()}
      {showError()}
      {newProductForm()}
    </Layout>
  );
};

export default AddProduct;
