import axios from "axios";

// server url
export const base_URL = "https://api.familyvibes.in/v1/api/"

const APIKit = axios.create({ baseURL: base_URL, timeout: 60000000, });

APIKit.interceptors.request.use(async (config) => {

    if (localStorage.getItem("token")) config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

    return config;
});

export default APIKit;