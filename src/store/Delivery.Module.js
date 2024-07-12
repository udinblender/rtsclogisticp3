import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL

const state = {
  dataTool: [],
}

const getters = {
  getDataTool: (state) => state.dataTool,
}

const mutations = {
  setDataTool(state, newPayload) {
    state.dataTool.push(newPayload)
  },
}

const actions = {
  //   async ActionSaveDataTool({ commit, dispatch }, payload) {
  //     try {
  //       const formData = new FormData()
  //       // Tambahkan data ke FormData
  //       formData.append('toolId', payload.toolId)
  //       formData.append('toolNm', payload.toolNm)
  //       formData.append('maker', payload.maker)
  //       formData.append('counter', payload.counter)
  //       formData.append('photo', payload.selectedFile) // Tambahkan file photo ke FormData

  //       const result = await axios.post(
  //         API_URL + '/tools/add',
  //         formData, // Gunakan FormData sebagai payload
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data', // Ubah Content-Type menjadi multipart/form-data
  //           },
  //         },
  //       )
  //       commit('setResponse', result)
  //     } catch (error) {
  //       console.error('Error adding tool:', error)
  //     }
  //   },
  async ActionSaveDataTool({ commit }, payload) {
    try {
      commit('setDataTool', payload)
    } catch (error) {
      console.error('Error adding tool:', error)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
