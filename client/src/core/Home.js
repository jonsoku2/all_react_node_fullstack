import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };
  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };
  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);
  return (
    <Layout title="Home Page" description="Welcome to Tamastudy">
      <h2>Best Sellers</h2>
      {productBySell.map((product, i) => (
        <Card key={i} product={product}></Card>
      ))}
      <hr />
      <h2>New arrivals</h2>
      {productByArrival.map((product, i) => (
        <Card key={i} product={product}></Card>
      ))}
    </Layout>
  );
};

export default Home;
