import Cookies from 'js-cookie'

export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      Cookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0)
    },
    TOOGLE_DEVICE: (state, device) => {
      state.device = device
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    toggleDevice({ commit }, device) {
      commit('TOOGLE_DEVICE', device)
    },
    closeSideBar({ commit }, withoutAnimation) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    }
  }
}
