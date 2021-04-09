import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    success: false,
    error: false,
    message: '',
    user: null,
    users: null,
    messages: []
  },
  mutations: {
    setUsers(state, users) {
      return state.users = users
    },
    setLoading(state, loading) {
      return state.loading = loading
    },
    setMessageFromApi(state, message) {
      return state.message = message
    },
    setSuccess(state, success) {
      return state.success = success
    },
    setError(state, error) {
      return state.error = error
    },
    setUser(state, user) {
      return state.user = user
    },
    setMessages(state, messages) {
      return state.messages = messages
    },
    setMessage(state, message) {
      return state.messages.push(message)
    }
  },
  actions: {
    registerUser({ commit }, payload) {
      commit('setLoading', true)
      commit('setError', null)
      commit('setSuccess', false)
      return axios.post('/auth/register', payload)
        .then(res => {
          const { data } = res
          commit('setSuccess', data.success)
        })
        .catch(e => {
          commit('setError', true)
          if (e.response) return commit('setMessageFromApi', e.response.data.message)
        })
        .finally(() => commit('setLoading', false))
    },
    loginUser({ commit }, payload) {
      commit('setLoading', true)
      commit('setError', null)
      commit('setSuccess', false)
      return axios.post('/auth/login', payload)
        .then(res => {
          const { data } = res
          commit('setSuccess', data.success)
        })
        .catch(e => {
          commit('setError', true)
          if (e.response) return commit('setMessageFromApi', e.response.data.message)
        })
        .finally(() => commit('setLoading', false))
    },
    getUser({ commit }) {
      return axios.get('/auth/me')
        .then(res => {
          const { data } = res
          commit('setUser', data.data)
        })
        .catch(e => commit('setError', e.response))
        .finally(() => commit('setLoading', false))
    },
    getUsers({ commit, state }) {
      return axios.get('/users', {
        params: {
          user: queryParams[state.user.userType]
        }
      })
        .then(res => {
          commit('setUsers', res.data.data)
        })
        .catch(e => console.error(e))
    },
    getMessages({ commit }, query) {
      commit('setLoading', true)
      return axios.get('/users/messages', {
        params: {
          user: query
        }
      })
        .then(res => {
          commit('setMessages', res.data.data)
        })
        .catch(e => console.error(e))
        .finally(() => commit('setLoading', false))
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    success(state) {
      return state.success
    },
    user(state) {
      return state.user
    },
    message(state) {
      return state.message
    },
    error(state) {
      return state.error
    },
    users(state) {
      return state.users
    },
    messages(state) {
      return state.messages
    }
  }
})

const queryParams = {
  'user': 'psychologist',
  'psychologist': 'user'
}
