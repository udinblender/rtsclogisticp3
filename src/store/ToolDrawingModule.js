import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

const state = {
  toolDrawings: [
    {
      id: 1,
      tanggal: '2024-07-01',
      tool_nm: 'Tool A',
      maker: 'Maker A',
      counter: 100,
      run_out: 0,
      point_angle: 45,
      step_length: 100,
      diameter: 25,
      chamfer_width: 5,
      margin_width: 1,
      pic: 'Mikel',
    },
    {
      id: 2,
      tanggal: '2024-07-02',
      tool_nm: 'Tool B',
      maker: 'Maker B',
      counter: 100,
      run_out: 0.01,
      point_angle: 50,
      step_length: 150,
      diameter: 30,
      chamfer_width: 6,
      margin_width: 1.5,
      pic: 'Bekham',
    },
    {
      id: 3,
      tanggal: '2024-07-03',
      tool_nm: 'Tool C',
      maker: 'Maker C',
      counter: 1000,
      run_out: 0.002,
      point_angle: 55,
      step_length: 200,
      diameter: 35,
      chamfer_width: 7,
      margin_width: 2,
      pic: 'Naldo',
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
  ],
}

const getters = {
  getToolDrawings: (state) => state.toolDrawings,
}

const mutations = {
  setToolDrawings(state, newPayload) {
    state.toolDrawings.push(newPayload)
  },
}

const actions = {
  async ActionAddToolDrawing({ commit }, payload) {
    try {
      commit('setToolDrawings', payload)
      console.log('setToolDrawings', payload)
    } catch (error) {
      console.error('Error adding tool drawing:', error)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
