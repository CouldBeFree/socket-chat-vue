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
    user: null
  },
  mutations: {
    setLoading(state, loading) {
      return state.loading = loading
    },
    setMessage(state, message) {
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
    }
  },
  actions: {
    registerUser({ commit }, payload) {
      commit('setLoading', true)
      commit('setError', null)
      commit('setSuccess', false)
      axios.post('/auth/register', payload)
        .then(res => {
          const { data } = res
          commit('setSuccess', data.success)
        })
        .catch(e => {
          commit('setError', true)
          if (e.response) return commit('setMessage', e.response.data.message)
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
          if (e.response) return commit('setMessage', e.response.data.message)
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
    }
  }
})
