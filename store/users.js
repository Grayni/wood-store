export const actions = {
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/users/admin/${id}`)
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async getUserById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/users/admin/${id}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }

}
