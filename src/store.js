import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // BASE_URL: 'https://capstone-node-backend.herokuapp.com',
    BASE_URL: 'http://localhost:3002',
    SOCKET_URL: 'http://localhost:3001',
    name: '_________',
    systems: [],
    form: {
      selected: 'A+',
      name: '',
      description: ''
    }
  },
  mutations: {
    setName(state, name){
      state.name = name
    },
    piForm(state, form){
      state['form'][form.name] = form.value
    },
    setSystems(state, systems){
      state.systems = systems
    }
  },
  actions: {

  }
})

export default store