import { config } from "./config";
import axios from "axios";

const apiurl = config.apiurl;

export const CallGetApiServices = (url, successCallBack, errorCallBack) => {
  console.log(`${apiurl}${url}`);
  axios.get(`${apiurl}${url}`).then(successCallBack).catch(errorCallBack);
};

export const CallPostApiServices = (
  url,
  data,
  successCallBack,
  errorCallBack
) => {
  console.log(`${apiurl}${url}`);
  axios
    .post(`${apiurl}${url}`, data)
    .then(successCallBack)
    .catch(errorCallBack);
};

export const CallPatchApiServices = (
  url,
  data,
  successCallBack,
  errorCallBack
) => {
  console.log(`${apiurl}${url}`);
  axios
    .patch(`${apiurl}${url}`, data)
    .then(successCallBack)
    .catch(errorCallBack);
};
