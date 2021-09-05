import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  withCredentials: false,
  headers: {},
});

export default {
  getInfo() {
    return apiClient.get("/pokemon?limit=151");
  },
};
