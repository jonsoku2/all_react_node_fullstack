import { API } from "../config";
import Axios from "axios";

export const createCategory = (userId, token, category) => {
  return Axios.post(`${API}/category/create/${userId}`, category, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const createProduct = async (userId, token, product) => {
  try {
    const res = await Axios.post(`${API}/product/create/${userId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
};

export const getCategories = async () => {
  try {
    const res = await Axios.get(`${API}/categories`);
    return res.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
};
