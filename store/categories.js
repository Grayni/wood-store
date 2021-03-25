export const state = () => ({
  categories: [],
  subcategories: [],
  
})

export const actions = {
  async fetchList({commit}) {
    try {
      const response = await this.$axios.$get('/api/categories/admin/categories-list')
      commit('fetchList', response)
      return response
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

  async create({commit}, formData) {
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

  async delete({commit}, {tag}) {
    try {
      const response = await this.$axios.$delete(`/api/categories/admin/${tag}`)
      commit('delete', tag)
      return response
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async changeStatus({commit}, {tag, status}) {
    try { 
      const response = await this.$axios.$put(`/api/categories/admin/status/${tag}`, {status})
      commit('changeStatus', {tag, status})
      return response
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
  fetchList(state, categories) {
    state.categories = categories
  },

  changeStatus(state, {tag, status}) {
    state.categories.find(category => category.tag === tag).status = status
  },

  delete(state, tag) {
    state.categories = state.categories.filter(v => v.tag !== tag)
  },

  fillSubcategoriesList(state, subcategories) {
    state.subcategories = subcategories
  }
}

export const getters = {
  categories(state) {
    return state.categories
  },

  subcategoriesList(state) {
    return state.subcategories
  }
}