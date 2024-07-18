import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

const state = {
  dataSystem: [
    {
      id: 1,
      system_type: 'System 1',
      system_value: 'System 1 Value',
      system_desc: 'System 1 Description',
      created_by: 'Admin',
    },
    {
      id: 2,
      system_type: 'System 2',
      system_value: 'System 2 Value',
      system_desc: 'System 2 Description',
      created_by: 'Admin 2',
    },
  ],
}

const getters = {
  getDataSystem: (state) => state.dataSystem,
}

const mutations = {
  setDataSystem(state, newPayload) {
    state.dataSystem.push(newPayload)
  },
  updateDataSystem(state, updatedPayload) {
    const index = state.dataSystem.findIndex(
      (system) => system.id === updatedPayload.id,
    )
    if (index !== -1) {
      state.dataSystem.splice(index, 1, updatedPayload)
    }
  },
  removeDataSystem(state, id) {
    state.dataSystem = state.dataSystem.filter((system) => system.id !== id)
  },
}

const actions = {
  async ActionSaveSystem({ commit }, payload) {
    try {
      commit('setDataSystem', payload)
    } catch (error) {
      console.log(error)
    }
  },
  async ActionEditSystem({ commit }, payload) {
    try {
      commit('updateDataSystem', payload)
    } catch (error) {
      console.log(error)
    }
  },
  async ActionDeleteSystem({ commit }, id) {
    try {
      commit('removeDataSystem', id)
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
