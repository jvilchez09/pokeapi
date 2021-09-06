import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  withCredentials: false,
  headers: {},
});

export default {
  getList(qtty) {
    return apiClient.get("/pokemon?limit=" + qtty);
    // console.log(id);
    // return apiClient.get("/pokemon/" + id);
  },
  getInfo(url) {
    // return apiClient.get("/pokemon?limit=151");
    // console.log(id);
    // return apiClient.get("/pokemon/" + id);
    return apiClient.get(url);
  },
};
