export const state = () => ({
  categories: [],
  subcategories: [],
  category: {
    title: '',
    parent: {
      label: '',
      value: ''
    },
    status: false,
    identifier: '',
  },
  firstborns: [],
  firstborn: {
    label: '',
    value: ''
  }
})

export const actions = {
  // get list categories
  async fetchList({commit}) { // +
    try {
      const response = await this.$axios.$get('/api/categories/admin/categories-list')
      commit('fetchList', response)
      return response
    } catch (e) {
      commit('setError', e , {root: true})
      throw e
    }
  },

  // get list firstborn categories
  async fetchListParentsNames ({commit}) { // +
    try {
      const response = await this.$axios.$post('/api/categories/admin/category-parent')
      commit('fetchListParentsNames', response)
      return response
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // create category
  async create({commit}, formData) {
    try {
      return await this.$axios.$post('/api/categories/admin/create-category', formData)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // get one category
  async getCategory({commit}, identifier) { // +
    try {
      const response = await this.$axios.$get(`/api/categories/admin/${identifier}`)
      commit('getCategory', response)
      return
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // update category
  async updateCategory({commit}, {category, identifier}) {
    try {
      return await this.$axios.$put(`/api/categories/admin/${identifier}`, category)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // update dependent firstborn
  async updateFirstborn({commit}, {identifier, parent}) {
    try {
      return await this.$axios.$put(`/api/categories/admin/f/${identifier}`, parent)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // delete category
  async delete({commit}, {identifier}) { // +
    try {
      const response = await this.$axios.$delete(`/api/categories/admin/${identifier}`)
      commit('delete', identifier)
      return response
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // change status show category
  async changeStatus({commit}, {identifier, status}) { // +
    try { 
      const response = await this.$axios.$put(`/api/categories/admin/status/${identifier}`, {status})
      commit('changeStatus', {identifier, status})
      return response
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // get childrens this category
  async getChildrens({commit}, {identifier}) {
    try {
      return await this.$axios.$get(`/api/categories/admin/childrens/${identifier}`)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // get subcategories list
  async fetchSubcategoriesList({commit}) {
    try {
      const response = await this.$axios.$get('/api/categories/admin/subcategories')
      console.log(response)
      commit('fillSubcategoriesList', response)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  }
}

export const mutations = {
  fetchList(state, categories) { // +
    state.categories = categories
  },

  getCategory(state, category) { // +
    state.category = category
  },

  fetchListParentsNames(state, firstborns) { // +
    state.firstborns = firstborns
  },

  changeTitle(state, title) {
    console.log(title)
    state.category.title = title
  },

  defineFirstborn(state, value) { // +
    state.firstborn = state.firstborns.find(x => x.value === value)
  },

  changeStatus(state, {identifier, status}) {
    state.categories.find(category => category.identifier === identifier).status = status
  },

  delete(state, identifier) {
    state.categories = state.categories.filter(v => v.identifier !== identifier)
  },

  fillSubcategoriesList(state, subcategories) {
    state.subcategories = subcategories
  }
}

export const getters = {
  category(state) { // +
    return state.category
  },

  firstborns(state) { // +
    return state.firstborns
  },
  
  firstborn(state) { // +
    return state.firstborn
  },

  categories(state) {
    return state.categories
  },

  subcategoriesList(state) {
    return state.subcategories
  }
}