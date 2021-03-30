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
  childrens: [],
  categoryInitial: {
    title: '',
    parent: {
      label: '',
      value: ''
    },
    status: false,
    identifier: ''
  },
  categoryEmpty: {
    title: '',
    parent: {
      label: '',
      value: ''
    },
    status: false,
    identifier: ''
  },
  loading: false
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
  async createCategory({commit}, category) {
    try {
      return await this.$axios.$post('/api/categories/admin/create-category', category)
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
    console.log(category, identifier)
    try {
      return await this.$axios.$put(`/api/categories/admin/${identifier}`, category)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // update dependent firstborn
  async updateFirstborn({commit}, {identifier, parent}) { // +
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
      const response = await this.$axios.$get(`/api/categories/admin/childrens/${identifier}`)
      commit('getChildrens', response)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // get subcategories list
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
  fetchList(state, categories) { // +
    state.categories = categories
  },

  getCategory(state, category) { // +
    state.category = category
  },

  resetCategory(state, category) {
    state.category = JSON.parse(JSON.stringify(state.categoryEmpty))
  },

  getChildrens(state, childrens) {
    state.childrens = childrens
  },

  resetChildrens(state) {
    state.childrens = []
  },

  fetchListParentsNames(state, firstborns) { // +
    state.firstborns = firstborns
  },

  changeTitle(state, title) {
    state.category.title = title
  },

  changeIdentifier(state, identifier) {
    state.category.identifier = identifier
  },

  defineParent(state, parent) { // +
    state.category.parent = parent
  },

  changeStatus(state, {identifier, status}) {
    state.categories.find(category => category.identifier === identifier).status = status
  },

  changeLocalStatus(state) {
    state.category.status = !state.category.status
  },

  delete(state, identifier) {
    state.categories = state.categories.filter(v => v.identifier !== identifier)
  },

  fillSubcategoriesList(state, subcategories) {
    state.subcategories = subcategories
  },
  initCategory(state) {
    state.categoryInitial = JSON.parse(JSON.stringify(state.category))
  },

  changeLoading(state, bool) {
    state.loading = bool
  },

  updateLocalIdentifier(state, identifier) {
    state.category.identifier = identifier
  }
}

export const getters = {

  firstborns(state) { // +
    return state.firstborns
  },

  categories(state) {
    return state.categories
  },

  category(state) { // +
    return state.category
  },

  categoryInitial(state) {
    return state.categoryInitial
  },

  categoryEmpty(state) {
    return state.categoryEmpty
  },

  childrens(state) {
    return state.childrens
  },

  subcategoriesList(state) {
    return state.subcategories
  },

  loading(state) {
    return state.loading
  }
}