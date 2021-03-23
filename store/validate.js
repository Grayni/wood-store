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

  async checkCharacter ({commit}, payload) {
    try {
      return await this.$axios.$post('/api/validate/unique-identifier', payload)
    } catch (e) {
      commit('setError', e, {root: true})
    }
  }
}