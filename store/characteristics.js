
// chars => characteristics

export const state = () => ({
  characteristics: [],
  names: [],
  characteristic: {
    title: '',
    identifier: '',
    values: [],
    status: false
  },
  backupChar: {},
  validate: null
})

let stateInitial = {}
Object.assign(stateInitial, state().characteristic)

export const actions = {

  async createCharacter({commit}, data) {
    try {
      return await this.$axios.$post('/api/characteristics/admin/characteristic-create', data)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async updateCharacter({commit}, formData) {
    try {
      const message = await this.$axios.$put(`/api/characteristics/admin/${formData.identifier}`, formData)
      return message
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async deleteCharacter({commit}, identifier) {
    try {
      commit('deleteLocalCharacter', identifier)
      return await this.$axios.$delete(`/api/characteristics/admin/${identifier}`)
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchCharsAll({commit}) {
    try {
      const response = await this.$axios.$get('/api/characteristics')
      commit('fillCharsList', response)
      return response
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchNames({commit}) {
    try {
      const response = await this.$axios.$get('/api/characteristics/admin/characteristics-names-list')
      commit('fillNames', response)
      return response
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async fetchCharOne({commit}, identifier) {
    try {
      const response = await this.$axios.$get(`/api/characteristics/admin/${identifier}`)
      const resFrozen = JSON.parse(JSON.stringify(response))
      
      commit('assignChar', {response, resFrozen})

      return response
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // start update form characteristic

  updateLocalTitle({commit}, title) {
    commit('updateLocalTitle', title)
  },

  changeLocalStatus({commit}, status) {
    commit('changeLocalStatus', status)
  },

  async addValue({commit}, {value, identifier}) {
    try {
      const response = await this.$axios.$put(`/api/characteristics/admin/new-value/${identifier}`, {value})
      commit('addLocalValue', value)
      return response
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async deleteValue({store, commit}, {index, value, identifier}) {
    try {
      const response = await this.$axios.$put(`/api/characteristics/admin/value/${identifier}`, {value})
      commit('deleteLocalValue', index)
      return response
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  // end update characteristic


  returnOriginal({commit}) {
    commit('clearChar')
  },

  writeValidate({commit}, validate) {
    commit('writeValidate', validate)
  }
}



export const mutations = {

  // start update characteristic form

  updateLocalTitle(state, title) {
    state.characteristic.title = title
  },

  addLocalValue(state, value) {
    state.characteristic.values.push(value)
  },

  changeLocalStatus(state, status) {
    state.characteristic.status = status
  },

  deleteLocalValue(state, index) {
    state.characteristic.values.splice(index, 1)
  },

  // end update characteristic form

  fillCharsList(state, chars) {
    state.characteristics = chars
  },
  fillNames(state, names) {
    state.names = names
  },
  deleteLocalCharacter(state, identifier) {
    state.names = state.names.filter(x => x.identifier !== identifier)
  },
  assignChar(state, {response, resFrozen}) {
    state.characteristic = response
    state.backupChar = resFrozen
  },
  // assignTwo(state, char) {
  //   state.backupChar = {...char} 
  // },
  clearChar(state) {
    state.characteristic = stateInitial
  },
  writeValidate(state, validate) {
    state.validate = validate
  }
}

export const getters = {
  charsList(state) {
    return state.characteristics
  },
  names(state) {
    return state.names
  },
  charsOn(state, getters) {
    return getters.charsList.filter(p => p.status)
  },
  characteristic(state) {
    return state.characteristic
  },
  backupChar(state) {
    return state.backupChar
  },
  validate(state) {
    return state.validate
  }
}