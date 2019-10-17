import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    BASE_URL: 'https://capstone-node-backend.herokuapp.com',
    // BASE_URL: 'http://localhost:3002',
    name: 'Test',
    piArray: []
  },
  mutations: {

  },
  actions: {

  }
})

export default store