import axios from "axios";

const newRequest = axios.create({
    baseURL: `http://localhost:3000/api/`,
    withCredentials: true,
});

const configHeader = {
    headers: {
      "Content-Type": "application/json",
    },
};

const configHeaderForFileUpload = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export { configHeader, newRequest, configHeaderForFileUpload };
