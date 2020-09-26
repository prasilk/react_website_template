import axios from "axios";
import _ from "lodash";
import { apiVersion, authorizationApi } from "../_configs";
var runTimeConfig = require("../_configs/runtime.config");

const getCookies = () =>
  document.cookie.split(";").reduce((cookies, item) => {
    const [name, value] = item.split("=");
    cookies[name] = value;
    return cookies;
  }, {});

export const apiService = {
  get,
  post,
  put,
  concurrent,
  deleteMethod,
  downloadFileAsPost,
  downloadFileAsGet,
};

async function get(url, params) {
  return axios.get(process.env.REACT_APP_DOMAIN + apiVersion + url, { params }); //creating multiple Api requests and storing in a array
}

async function deleteMethod(url) {
  return axios({
    method: "delete",
    url: process.env.REACT_APP_DOMAIN + apiVersion + url,
  });
}
async function put(url, params) {
  return axios({
    method: "put",
    url: process.env.REACT_APP_DOMAIN + apiVersion + url,
    data: params,
  });
}

async function post(url, params) {
  return axios({
    method: "post",
    url: process.env.REACT_APP_DOMAIN + apiVersion + url,
    data: params,
  });
}

async function downloadFileAsPost(url, params, downloadProgressEvent) {
  //downloadProgressEvent Function will recevie 0 - 100 value revealing the download progress percentage
  return axios({
    method: "post",
    url: process.env.REACT_APP_DOMAIN + apiVersion + url,
    data: params,
    responseType: "arraybuffer",
    onDownloadProgress: (progressEvent) => {
      let percentCompleted = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (_.isFunction(downloadProgressEvent))
        downloadProgressEvent(percentCompleted);
    },
  }).then((res) => saveBlob(res));
}

async function downloadFileAsGet(url, params, downloadProgressEvent) {
  //downloadProgressEvent Function will recevie 0 - 100 value revealing the download progress percentage
  axios
    .get(process.env.REACT_APP_DOMAIN + apiVersion + url, {
      params,
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (_.isFunction(downloadProgressEvent))
          downloadProgressEvent(percentCompleted);
      },
    })
    .then((res) => saveBlob(res));
}

function concurrent(requests) {
  return axios.all(requests);
}

axios.interceptors.request.use(
  function (config) {
    if (runTimeConfig && runTimeConfig.accessTokens)
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + runTimeConfig.accessTokens.backend,
      };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (
      error.config.url.includes(authorizationApi.default) &&
      error.response.status === 403
    ) {
      // window.location = "/";
    }
  }
);

function saveBlob(res) {
  let filename = res.headers["content-disposition"]
    .split(";")
    .find((n) => n.includes("filename="))
    .replace("filename=", "")
    .trim();

  var url = window.URL.createObjectURL(
    new Blob([res.data], { type: res.headers["content-type"] })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
}
