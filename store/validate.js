export const state = () => ({
  deleteNotify: {
    confirmButtonText: 'OK',
    cancelButtonText: 'Отмена',
    type: 'warning',
    center: true
  }
})

export const actions = {

  //validate unique
  async uniqueValue ({commit}, payload) {
    try {
      return await this.$axios.$post('/api/validate/unique-value', payload)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async checkOldPass ({commit}, payload) {
    try {
      return await this.$axios.$post('/api/validate/check-pass', payload)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async checkIdentifier ({commit}, {section, value}) {
    try {
      return await this.$axios.$post(`/api/validate/unique-identifier/${section}`, {value})
    } catch (e) {
      commit('setError', e, {root: true})
    }
  }
}

export const getters = {
  deleteNotify(state) {
    return state.deleteNotify
  }
}