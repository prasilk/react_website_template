import axios from "axios";
import _ from "lodash";
import { apiVersion, authorizationApi } from "../_configs";
// var runTimeConfig = require("../_configs/runtime.config");

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

async function get(url, params, thirdPartyApi) {
  url =
    thirdPartyApi === true
      ? url
      : process.env.REACT_APP_DOMAIN + apiVersion + url;
  if (process.env.REACT_APP_ENV === "development") console.log("ajsdlkjsakl");
  return axios.get(url, { params }); //creating multiple Api requests and storing in a array
}

async function deleteMethod(url, thirdPartyApi) {
  url =
    thirdPartyApi === true
      ? url
      : process.env.REACT_APP_DOMAIN + apiVersion + url;
  return axios({ method: "delete", url });
}
async function put(url, params, thirdPartyApi) {
  url =
    thirdPartyApi === true
      ? url
      : process.env.REACT_APP_DOMAIN + apiVersion + url;
  return axios({ method: "put", url, data: params });
}

async function post(url, params, thirdPartyApi) {
  url =
    thirdPartyApi === true
      ? url
      : process.env.REACT_APP_DOMAIN + apiVersion + url;
  return axios({ method: "post", url, data: params });
}

async function downloadFileAsPost(
  url,
  params,
  downloadProgressEvent,
  thirdPartyApi
) {
  //downloadProgressEvent Function will recevie 0 - 100 value revealing the download progress percentage

  url =
    thirdPartyApi === true
      ? url
      : process.env.REACT_APP_DOMAIN + apiVersion + url;
  return axios({
    method: "post",
    url,
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

async function downloadFileAsGet(
  url,
  params,
  downloadProgressEvent,
  thirdPartyApi
) {
  //downloadProgressEvent Function will recevie 0 - 100 value revealing the download progress percentage
  url =
    thirdPartyApi === true
      ? url
      : process.env.REACT_APP_DOMAIN + apiVersion + url;
  axios
    .get(url, {
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
