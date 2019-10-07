import axios from "axios";

const domain = "192.168.99.1";
const port = "3333";

const api = axios.create({
  baseURL: `http://${domain}:${port}`
});

api.defaultDomain = domain;

export default api;
