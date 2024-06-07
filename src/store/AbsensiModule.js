import axios from 'axios'
import moment from 'moment-timezone'
// Impor variabel lingkungan
const API_URL = process.env.VUE_APP_API_URL

const state = {
  redShiftEmployees: [],
  whiteShiftEmployees: [],
  selectedStatus: [[], []],
  historyAbsence: [],
  percentageHadir: '',
  currentShift: null,
  selectedEmployee: {
    GL: null,
    NC: null,
    QC: null,
    WnD: null,
    SnO: null,
  },
}

const getters = {
  getRedShiftEmployees(state) {
    return state.redShiftEmployees
  },
  getWhiteShiftEmployees(state) {
    return state.whiteShiftEmployees
  },
  getSelectedStatus(state) {
    return state.selectedStatus
  },
  getPercentageHadir(state) {
    return state.percentageHadir
  },
  getCurrentShift(state) {
    return state.currentShift
  },
  getSelectedEmployee: (state) => (position) => {
    return state.selectedEmployee[position]
  },
  getHistoryAbsence(state) {
    return state.historyAbsence
  },
}

const mutations = {
  setRedShiftEmployees(state, employees) {
    // console.log("setRedShiftEmployees", employees);
    state.redShiftEmployees = employees
  },
  setWhiteShiftEmployees(state, employees) {
    // console.log("setWhiteShiftEmployees", employees);
    state.whiteShiftEmployees = employees
  },

  setPercentageHadir(state, percentage) {
    state.percentageHadir = percentage
  },
  setCurrentShift(state, shift) {
    // console.log("setCurrentShift mutation", shift);
    state.currentShift = shift
  },
  setSelectedEmployee(state, payload) {
    state.selectedEmployee[payload.position] = payload.employee
  },
  setHistoryAbsence(state, historyAbsence) {
    state.historyAbsence = historyAbsence
  },
  setUpdateStatus(state, historyAbsence) {
    const setEmployeeStatus = (employees) => {
      employees.forEach((employee) => {
        const absence = historyAbsence.find(
          (a) => a.employee_id === employee.employee_id,
        )
        employee.status = absence ? absence.status : null
      })
    }

    setEmployeeStatus(state.redShiftEmployees)
    setEmployeeStatus(state.whiteShiftEmployees)
  },
}

const actions = {
  async fetchEmployeeData({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/select/get`)
      const data = response.data
      if (data.message === 'Success to Get Data') {
        const employees = data.data
        employees.sort((a, b) => {
          const jabatanOrder = {
            'Group Leader': 1,
            'Team Leader': 2,
            'Team Member': 3,
          }
          return jabatanOrder[a.jabatan] - jabatanOrder[b.jabatan]
        })
        const employeesWithPhotoUrl = employees.map((employee) => {
          return {
            ...employee,
            photourl: `${API_URL}${employee.profile}`,
          }
        })

        const redShiftEmployees = employeesWithPhotoUrl.filter(
          (employee) => employee.shift === 'Red',
        )
        const whiteShiftEmployees = employeesWithPhotoUrl.filter(
          (employee) => employee.shift === 'White',
        )
        commit('setRedShiftEmployees', redShiftEmployees)
        commit('setWhiteShiftEmployees', whiteShiftEmployees)
        // console.log('iki lho', redShiftEmployees, whiteShiftEmployees);
      } else {
        commit('setRedShiftEmployees', [])
        commit('setWhiteShiftEmployees', [])
      }
    } catch (error) {
      console.error('Error fetching employee data:', error)
      commit('setRedShiftEmployees', [])
      commit('setWhiteShiftEmployees', [])
    }
  },
  async addCurrentShift({ commit }, payload) {
    try {
      const shift = payload
      const localTime = moment()
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DD HH:mm:ss')
      // console.log('ini shift vuex', shift);
      const response = await axios.post(API_URL + '/shift/add', {
        shift,
        localTime,
      })
      // Ambil data yang diterima dari respons
      const responseData = response.data
      const currentShift = responseData.data
      commit('setCurrentShift', currentShift)
      // console.log("setcurenshift ambil",currentShift);
    } catch (error) {
      console.log('eror bro :', error)
    }
  },
  async ambilShift({ commit }) {
    try {
      const response = await axios.get(API_URL + '/shift/get')
      const data = response.data
      // console.log('data', data)
      // Ekstrak nilai current_shift dari data respons
      const currentShift = data.data[0].current_shift
      // console.log('currentShift ambil', currentShift);
      // Panggil komit untuk memperbarui currentShift di Vuex store
      commit('setCurrentShift', currentShift)
      // console.log('setcurenshift ambil', currentShift);
    } catch (error) {}
  },
  async updateEmployeeStatus({ state }, payload) {
    // console.log('kepanggil gag.....');
    try {
      const { shiftIndex, cardIndex, status } = payload

      // Mendapatkan waktu lokal saat ini di zona Asia/Jakarta menggunakan Moment.js
      const localTime = moment()
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DD HH:mm:ss')
      const employee =
        shiftIndex === 0
          ? state.redShiftEmployees[cardIndex]
          : state.whiteShiftEmployees[cardIndex]
      if (employee && status) {
        const response = await axios.post(API_URL + '/presence/add', {
          employee_id: employee.employee_id,
          nama: employee.nama,
          noreg: employee.noreg,
          status: status,
          dateAbsence: localTime,
          currentShift: state.currentShift,
        })
        // console.log(response.data)
      }
    } catch (error) {
      console.error('Error sending data to backend:', error)
    }
  },

  async fetchHistoryAbsence({ commit, dispatch }) {
    try {
      const response = await axios.get(`${API_URL}/presence/get?`)
      const data = response.data
      // console.log('data', data)

      if (data.message === 'Success to Get Absence') {
        const historyAbsence = data.data
        // console.log('historyAbsence', historyAbsence)
        commit('setHistoryAbsence', historyAbsence)
        // console.log('historyAbsence', historyAbsence)

        // Set status dan shift ke dalam state Vuex
        commit('setUpdateStatus', historyAbsence)
        dispatch('fetchPercentageHadir')
      } else {
        console.error('Failed to fetch absence data:', data.message)
      }
    } catch (error) {
      console.error('Error fetching absence data:', error)
    }
  },

  async fetchPercentageHadir({ commit, state }) {
    try {
      const historyAbsence = state.historyAbsence

      // Hitung total karyawan dan total yang hadir sesuai dengan kondisi
      let totalEmployees
      let totalHadir
      if (state.currentShift === null) {
        // console.log('state.currentShift', state.currentShift);
        totalEmployees =
          state.redShiftEmployees.length + state.whiteShiftEmployees.length
        totalHadir = historyAbsence.filter(
          (absence) => absence.status === 'Hadir',
        ).length
      } else {
        const shiftEmployees =
          state.currentShift === 'Red'
            ? state.redShiftEmployees
            : state.whiteShiftEmployees
        totalEmployees = shiftEmployees.length
        totalHadir = historyAbsence.filter(
          (absence) =>
            absence.status === 'Hadir' &&
            shiftEmployees.some(
              (employee) => employee.employee_id === absence.employee_id,
            ),
        ).length
      }

      // Hitung presentase hadir
      const percentageHadir =
        totalEmployees > 0 ? (totalHadir / totalEmployees) * 100 : 0

      // Set nilai percentageHadir ke dalam store
      commit('setPercentageHadir', percentageHadir.toFixed(2) + '%')
    } catch (error) {
      console.error('Error fetching percentageHadir:', error)
      commit('setPercentageHadir', '') // Atau tangani error sesuai kebutuhan Anda
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
