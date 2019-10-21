import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    BASE_URL: 'https://capstone-node-backend.herokuapp.com',
    // BASE_URL: 'http://localhost:3001',
    name: '_________',
    systems: [],
    form: {
      selected: 'Raspberry Pi 4 Model B',
      name: '',
      description: ''
    },
    models: [
      {id: 1, name: 'Pi 4 B'},
      {id: 2, name: 'Pi 3 A+'},
      {id: 3, name: 'Pi 3 B+'},
      {id: 4, name: 'Pi 3 B'},
      {id: 5, name: 'Pi 2 B'},
      {id: 6, name: 'Pi 1 B+'},
      {id: 7, name: 'Pi 1 A+'},
      {id: 8, name: 'Pi Zero W'},
      {id: 9, name: 'Pi Zero'},
    ]
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