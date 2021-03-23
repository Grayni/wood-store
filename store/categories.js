export const state = () => ({
  subcategories: []
})

export const actions = {
  async fetchCategoriesList({commit}) {
    try {
      return await this.$axios.$get('/api/categories/admin/categories-list')
    } catch (e) {
      commit('setError', e , {root: true})
      throw e
    }
  },

  async fetchParentCategories ({commit}, firstborn) {
    try {
      return await this.$axios.$post('/api/categories/admin/category-parent', firstborn)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async createCategory({commit}, formData) {
    try {
      return await this.$axios.$post('/api/categories/admin/create-category', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async getCategory({commit}, tag) {
    try {
      return await this.$axios.$get(`/api/categories/admin/${tag}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async updateCategory({commit}, {category, tag}) {
    try {
      return await this.$axios.$put(`/api/categories/admin/${tag}`, category)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async updateFirstborn({commit}, {tag, parent}) {
    try {
      return await this.$axios.$put(`/api/categories/admin/f/${tag}`, parent)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async deleteCategory({commit}, {tag}) {
    try {
      return await this.$axios.$delete(`/api/categories/admin/${tag}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async saveStatus({commit}, {tag, status}) {
    try {
      return await this.$axios.$put(`/api/categories/admin/status/${tag}`, {status})
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async getChildrens({commit}, {tag}) {
    try {
      return await this.$axios.$get(`/api/categories/admin/childrens/${tag}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchSubcategoriesList({commit}) {
    try {
      const response = await this.$axios.$get('/api/categories/admin/subcategories')
      commit('fillSubcategoriesList', response)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }
}

export const mutations = {
  fillSubcategoriesList(state, subcategories) {
    state.subcategories = subcategories
  }
}

export const getters = {
  subcategoriesList(state) {
    return state.subcategories
  }
}