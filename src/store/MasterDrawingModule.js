import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

const state = {
  measurements: [
    // {
    //   id: 1,
    //   measurements: [
    //     {
    //       lowerLimit: '0',
    //       name: 'Point Angle',
    //       unit: '°',
    //       upperLimit: '2',
    //       value: '140',
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   measurements: [
    //     {
    //       lowerLimit: '0.5',
    //       name: 'Margin Width',
    //       unit: 'mm',
    //       upperLimit: '1',
    //       value: '1',
    //     },
    //   ],
    // },
  ],
  masterDrawings: [
    {
      id: 1,
      registerDate: ' 11-07-2024',
      toolNm: ' DSSW-04121',
      maker: 'Sumitomo',
      counter: ' 300',
      photo: 'cilukbang.png',
      pic: 'Bambang',
    },
    {
      id: 2,
      registerDate: ' 11-07-2024',
      toolNm: ' DSSW-04120',
      maker: 'Sumitomo',
      counter: ' 300',
      photo: 'cilukbang.png',
      pic: 'Fajar TC',
    },
  ],
}

const getters = {
  getMeasurements: (state) => state.measurements,
  getMasterDrawings: (state) => state.masterDrawings,
}

const mutations = {
  setMeasurements(state, newPayload) {
    state.measurements.push(newPayload)
  },
  setMasterDrawing(state, newPayload) {
    state.masterDrawings.push(newPayload)
  },
}

const actions = {
  async ActionSaveMeasurements({ commit }, payload) {
    try {
      commit('setMeasurements', payload)
      console.log('setMeasurements', payload)
    } catch (error) {
      console.error('Error adding tool drawing:', error)
    }
  },
  async ActionSaveMasterDrawing({ commit }, payload) {
    try {
      commit('setMasterDrawing', payload)
      console.log('setMasterDrawing', payload)
    } catch (error) {
      console.error('Error adding master drawing:', error)
    }
  },
  async ActionEditMasterDrawing({ commit }, payload) {
    // console.log('payload', payload)
    try {
      // console.log(response.data.data)
      commit('setMasterDrawing', payload)
      // console.log('setMeasurements', response.data.data)
    } catch (error) {
      console.error('Error fetching measurements:', error)
    }
  },
  async ActionDeleteMasterDrawing({ commit }, payload) {
    // console.log('payload', payload)
    try {
      // console.log(response.data.data)
      commit('setMasterDrawing', payload)
      // console.log('setMeasurements', response.data.data)
    } catch (error) {
      console.error('Error fetching measurements:', error)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
