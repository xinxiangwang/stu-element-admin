import { getToken } from '@/utils/auth'
import { login } from '@/api/user'
// import { validUsername } from '../../utils/validate'
import { setToken } from '../../utils/auth'

const defaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

export default {
  namespaced: true,
  state: defaultState(),
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password }).then(ret => {
          const { data } = ret
          commit('SET_TOKEN', data.token) // vuex
          setToken(data.token) // cookie
          resolve(ret)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
