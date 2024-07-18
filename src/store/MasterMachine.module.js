import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

const state = {
  dataMachine: [],
}

const getters = {
  getMachineTool(state) {
    return state.dataMachine
  },
}

const mutations = {
  setMachineTool(state, payload) {
    state.dataMachine = payload
  },
}

const actions = {
  async ActionAddMachineTMS({ commit }, payload) {
    try {
      //   const response = await axios.post(`${API_URL}/machines/TMS`, payload)
      commit('setMachineTool', payload)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  async ActionGetMachine({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/machines/TMS`)
      commit('setMachineTool', response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  async ActionEditMachineTMS({ commit }, payload) {
    try {
      const response = await axios.put(
        `${API_URL}/machines/TMS/${payload.id}`,
        payload,
      )
      commit('setMachineTool', response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
  async ActionDeleteMachineTMS({ commit }, payload) {
    try {
      const response = await axios.delete(`${API_URL}/machines/TMS/${payload}`)
      commit('setMachineTool', response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.log(error)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
