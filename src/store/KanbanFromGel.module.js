const state = {
  cart: [], // Menyimpan item-item dalam keranjang
}

const getters = {
  getCart: (state) => state.cart, // Getter untuk mendapatkan seluruh keranjang
}

const mutations = {
  addToCart(state, tool) {
    const existingItem = state.cart.find(
      (item) => item.tool_no === tool.tool_no,
    )
    if (existingItem) {
      existingItem.quantity++
    } else {
      state.cart.push({ ...tool, quantity: 1 })
    }
  },

  removeFromCart(state, tool) {
    const index = state.cart.findIndex((item) => item.tool_no === tool.tool_no)
    if (index !== -1) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--
      } else {
        state.cart.splice(index, 1)
      }
    }
  },
}

const actions = {
  addToCart({ commit }, tool) {
    commit('addToCart', tool)
  },

  removeFromCart({ commit }, tool) {
    commit('removeFromCart', tool)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
