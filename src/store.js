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
      selected: 'Raspberry Pi 4 B',
      name: '',
    },
    models: [
      {id: 1, name: 'Raspberry Pi 4 B'},
      {id: 2, name: 'Raspberry Pi 3 A+'},
      {id: 3, name: 'Raspberry Pi 3 B+'},
      {id: 4, name: 'Raspberry Pi 3 B'},
      {id: 5, name: 'Raspberry Pi 2 B'},
      {id: 6, name: 'Raspberry Pi 1 B+'},
      {id: 7, name: 'Raspberry Pi 1 A+'},
      {id: 8, name: 'Raspberry Pi Zero W'},
      {id: 9, name: 'Raspberry Pi Zero'},
    ],
    pis: [
      {id: 1, name: '1 A+', source: '1A+', url: 'https://www.raspberrypi.org/products/raspberry-pi-1-model-a-plus/'},
      {id: 2, name: '1 B+', source: '1B+', url: 'https://www.raspberrypi.org/products/raspberry-pi-1-model-b-plus/'},
      {id: 3, name: '2 B', source: '2B', url: 'https://www.raspberrypi.org/products/raspberry-pi-2-model-b/'},
      {id: 4, name: '3 A+', source: '3A+', url: 'https://www.raspberrypi.org/products/raspberry-pi-3-model-a-plus/'},
      {id: 5, name: '3 B', source: '3B', url: 'https://www.raspberrypi.org/products/raspberry-pi-3-model-b/'},
      {id: 6, name: '3 B+', source: '3B+', url: 'https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/'},
      {id: 7, name: '4 B', source: '4B', url: 'https://www.raspberrypi.org/products/raspberry-pi-4-model-b/'},
      {id: 8, name: 'Zero', source: 'Zero', url: 'https://www.raspberrypi.org/products/raspberry-pi-zero/'},
      {id: 9, name: 'Zero W', source: 'ZeroW', url: 'https://www.raspberrypi.org/products/raspberry-pi-zero-w/'},
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
    },
    deletePi(state, id){
      state.systems = state.systems.filter(system => system.id != id)
    }
  },
  actions: {

  }
})

export default store