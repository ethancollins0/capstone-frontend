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
    ],
    pis: [
      {id: 1, name: '1 A+', source: '1A+'},
      {id: 2, name: '1 B+', source: '1B+'},
      {id: 3, name: '2 B', source: '2B'},
      {id: 4, name: '3 A+', source: '3A+'},
      {id: 5, name: '3 B', source: '3B'},
      {id: 6, name: '3 B+', source: '3B+'},
      {id: 7, name: '4 B', source: '4B'},
      {id: 8, name: 'Zero', source: 'Zero'},
      {id: 9, name: 'Zero W', source: 'ZeroW'},
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