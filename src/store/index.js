import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
  state: {
    users: [],
  },

  mutations: {
    SET_USERS (state, users) {
      state.users = users
    },

    ADD_USER (state, user) {
      state.users.push(user);
    },

    // REMOVE_FROM_CARD(state, index) {
    //   state.cart.splice(index, 1);
    // },
    // DECREMENT_ITEM_CART(state, index) {
    //   state.cart[index].quantity -= 1;
    // },
    // INCREMENT_ITEM_CART(state, index) {
    //   state.cart[index].quantity += 1;
    // },
  },

  actions: {
    async REQUEST_USERS({commit}, url) {
      try {
        const dataRes = await fetch(url)
        const users = await dataRes.json()
        commit('SET_USERS', users)
      }
      catch (error) {
        console.error(error);
        console.error('error');
      }
    },
  },

  getters: {
    GET_USERS(state) {
      return state.users;
    },
    // GET_TOTAL_COST(state) {
    //   let totalCost = state.cart.reduce((total, cardFromCart)=> {
    //     return total + (cardFromCart.quantity * cardFromCart.price);
    //   }, 0);
    //   return Math.ceil(totalCost * 100) / 100;
    // }
  },
})
