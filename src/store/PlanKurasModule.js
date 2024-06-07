import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

const state = {
  planKuras: [],
}

const getters = {
  getPlanKuras: (state) => state.planKuras,
}

const mutations = {
  setPlanKuras(state, payload) {
    state.planKuras = payload
  },
}

const actions = {
  async fetchPlanKuras({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/planSchedule/get`)
      commit('setPlanKuras', response.data.data)
      //   console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching plan kuras:', error)
    }
  },
  async addPlanKuras({ commit, state }) {
    try {
      const payload = state.planKuras
      const response = await axios.post(`${API_URL}/planSchedule/add`, {
        planKuras: payload,
      })
      commit('setPlanKuras', response.data.data)
      console.log(response.data.data)
    } catch (error) {
      console.error('Error adding plan kuras:', error)
    }
  },
  async ActionSearchPlanKuras({ commit }, payload) {
    try {
      const response = await axios.get(`${API_URL}/planSchedule/get`, {
        params: {
          machine_nm: payload,
        },
      })
      if (response.data && response.data.data) {
        if (response.data.data.length === 0) {
          // Jika array kosong, tampilkan pesan alert
          alert('Data Tidak Ada')
        }
      }
      commit('setPlanKuras', response.data.data)
    } catch (error) {
      console.error('Error fetching plan kuras:', error)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
