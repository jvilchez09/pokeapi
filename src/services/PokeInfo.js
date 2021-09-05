import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  withCredentials: false,
  headers: {},
});

export default {
  getInfo(id) {
    // return apiClient.get("/pokemon?limit=151");
    // console.log(id);
    return apiClient.get("/pokemon/" + id);
  },
};
