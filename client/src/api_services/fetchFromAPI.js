import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`);
  return data;
};

export const postToAPI = async (url, obj) => {
  const { data } = await axios.post(`${BASE_URL}/${url}`, obj);
  return data;
};
