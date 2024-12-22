import { login as loginApi } from "@/api/login";
import router from "@/router";
import { setTokenTime } from "@/utils/auth";

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") || '',
    siderType:true,
    user: JSON.parse( localStorage.getItem("user")) || '',
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    changeSiderType(state){
      state.siderType = !state.siderType 
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user))  
    }
  },
  actions: {
    //登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo).then(res => {
          commit('setToken',res.token)
          commit('setUser',res)
          setTokenTime()
          router.replace('/');
          resolve()
        }).catch((error) => {
          reject(error)
        })
      });
    },
    logout({commit}){
      commit('setToken','')
      commit('setUser',{})
      localStorage.clear()
      router.replace('/login')
    }
  },
};
