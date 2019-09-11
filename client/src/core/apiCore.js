import { API } from "../config";
import Axios from "axios";

export const getProducts = async sortBy => {
  try {
    const res = await Axios.get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`);
    return res.data;
  } catch (err) {
    console.error(err);
    return err.response.data;
  }
};
