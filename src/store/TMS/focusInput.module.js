import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL

export const GET_FOCUS_INPUT = 'GET_FOCUS_INPUT'
export const SET_FOCUS_INPUT = 'SET_FOCUS_INPUT'
export const ACTION_FOCUS_INPUT = 'ACTION_FOCUS_INPUT'

const state = {
    is_focus_input: true,
}

const getters = {
    GET_FOCUS_INPUT(state) {
        return state.is_focus_input
    },
}

const mutations = {
    SET_FOCUS_INPUT(state, payload) {
        state.is_focus_input = payload
    },
}

const actions = {
    async ACTION_FOCUS_INPUT({ commit }, payload) {
        try {
            commit(SET_FOCUS_INPUT, payload)
        } catch (error) {
            console.error(error)
        }
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}