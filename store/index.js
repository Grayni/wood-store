export const state = () => ({
  error: null,
  show: false,
  loading: false,
  loadingPage: true
})

export const actions = {
  nuxtServerInit({dispatch}) {
    dispatch('auth/autoLogin')
  },

  loadingPageOff({commit}) {
    commit('loadingPageOff')
  }
}

export const mutations = {
  setError(state, error) {
    state.error = error
  },

  clearError(state) {
    state.error = null
  },

  loadingPageOff(state) {
    state.loadingPage = false
  }
}

export const getters = {
  error(state) {
    return state.error
  },
  loading(state) {
    return state.loading
  },
  loadingPage(state) {
    return state.loadingPage
  }
}
