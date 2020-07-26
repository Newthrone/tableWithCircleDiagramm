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
    UPDATE_USER(state, user) {
      const idx = state.users.findIndex(item => item.id === user.id);
      state.users[idx] = user
    },
    REMOVE_USER(state, user) {
      const idx = state.users.findIndex(item => item.id === user.id);
      state.users.splice(idx, 1)
    }
  },

  actions: {
    async REQUEST_USERS({commit}, url) {
      try {
        const dataRes = await fetch(url)
        const users = await dataRes.json()
        commit('SET_USERS', users)
      }
      catch (error) {
        console.error(error)
      }
    },
  },

  getters: {
    GET_USERS(state) {
      return state.users
    },
    GET_AGE_DISTRIBUTION_IN_DEGREES(state) {
      let ageDistribution = [0, 0, 0, 0, 0]
      state.users.forEach(({ age }) => {
        if (age < 20) ageDistribution[0] += 1
        else if (age < 30) ageDistribution[1] += 1
        else if (age < 40) ageDistribution[2] += 1
        else if (age < 50) ageDistribution[3] += 1
        else ageDistribution[4] += 1
      })

      return ageDistribution.map((count, idx) => {
        let num = ageDistribution[idx] / state.users.length * 100
        return Math.round((num + 0.00001) * 100) / 100
      })
    }
  },
})
