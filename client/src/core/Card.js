import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <div>
        <ShowImage item={product} url="product"></ShowImage>
        <p>{product.description}</p>
        <p>$ {product.price}</p>
        <Link to="/">
          <button>View Product</button>
        </Link>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
