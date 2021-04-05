import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  users: [],
  user: {
    surname: '',
    name: '',
    email: '',
    login: '',
    pass: '',
    passrep: '',
    phone: '',
    adress: '',
    birthday: '',
    status: ''
  }
})

let userEmpty = JSON.parse(JSON.stringify(state().user))

export const actions = {
  async fetchUsersList({commit}) {
    try {
      const response = await this.$axios.$get('/api/auth/admin/users-list')
      commit('fetchUsersList', response)
      return 'good'
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async login({commit, dispatch}, formData) {
    try {
      const {token} = await this.$axios.$post('/api/auth/admin/login', formData)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async createUser({commit}, user) {
    try {
      const response = await this.$axios.$post('/api/auth/admin/create-user', user)
      return response
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async fetchUserById({commit}, id) {
    try {
      const response = await this.$axios.$get(`/api/auth/admin/${id}`)
      commit('fetchUserById', response)
      return
    } catch (e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  setToken({commit}, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },

  logout({commit}) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  },

  autoLogin({dispatch}) {
    //console.log(this.app.context.req.headers)
    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isJWTValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  },

  async updateUser({commit}, user) {
    try {
      return await this.$axios.$put(`/api/auth/admin/update-users/${user._id}`, user)
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  },

  async removeUser({commit}, id) {
    try {
      commit('removeUser', id)
      return await this.$axios.$delete(`/api/auth/admin/${id}`)
    } catch(e) {
      commit('setError', e, {root: true})
      throw e
    }
  }
}


export const mutations = {
  setToken: (state, token) => state.token = token,

  clearToken: state => state.token = null,

  fetchUsersList: (state, users) => state.users = users,

  removeUser: (state, id) => state.users = state.users.filter(x=> x._id !== id),

  cleanUserFields: state => state.user = JSON.parse(JSON.stringify(userEmpty)),

  fetchUserById: (state, user) => state.user = state.user = user,

  // add
  changeSurname: (state, surname) => state.user.surname = surname,
  changeName: (state, name) => state.user.name = name,
  changeEmail: (state, email) => state.user.email = email,
  changeLogin: (state, login) => state.user.login = login,
  changePass: (state, pass) => state.user.pass = pass,
  changePassrep: (state, passrep) => state.user.passrep = passrep,
  changePhone: (state, phone) => state.user.phone = phone,
  changeAdress: (state, adress) => state.user.adress = adress,
  changeBirthday: (state, birthday) => state.user.birthday = birthday,
  changeStatus: (state, status) => state.user.status = status
}


export const getters = {
  isAuthenticated: state => Boolean(state.token),

  token: state => state.token,
  
  users: state => state.users,
  
  user: state => state.user
}






function isJWTValid(token) {
  if (!token) return

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
