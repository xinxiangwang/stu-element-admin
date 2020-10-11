export default {
  namespaced: true,
  state: {
    visitedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        // 处理meta没有title的路由
        Object.assign({}, view, { title: view.meta.title || 'no-name' })
      )
    },
    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
        }
      }
    },
    DEL_OTHER_VIEW: (state, view) => {
      state.visitedViews = state.visitedViews.filter(item => {
        return view.path === item.path
      })
    }
  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      // dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view)
    },
    delView({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view)
        resolve({
          visitedViews: [...state.visitedViews]
        })
      })
    },
    delOtherView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHER_VIEW', view)
        resolve({
          visitedViews: [...state.visitedViews]
        })
      })
    },
    delVisitedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view)
        resolve([...state.visitedViews])
      })
    }
  }
}
