import axios from "axios";
import { ElMessage } from "element-plus";
import { diffTokenTime } from "@/utils/auth";
import store from "@/store";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    //是否有token，有就等于已经登陆，比较token是否过期
    if(localStorage.getItem('token')){
      if(diffTokenTime()){
        store.dispatch('app/logout');
        return Promise.reject(new Error("token过期"));
      }
    }
    config.headers.token = localStorage.getItem('token');
    console.log("请求头信息:", config.headers); // 调试信息
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

service.interceptors.response.use(
  (response) => {
    const { code, data, msg } = response.data;
    if (code === 200) {
      return data;
    } else {
      ElMessage.error(msg);
      return Promise.reject(new Error(msg));
    }
  },
  (error) => {
    error.response && ElMessage.error(error.response.data.msg);
    ElMessage.error("网络错误，请稍后再试");
    return Promise.reject(new Error("error.response.data.msg"));
  }
);

export default service;
