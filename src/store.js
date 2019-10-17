import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    BASE_URL: 'https://capstone-node-backend.herokuapp.com',
    // BASE_URL: 'http://localhost:3002',
    name: '_________',
    piArray: [],
    models: [
      {name: 'A+', image: '@/assets/A+', id: 1},
      {name: 'B+', image: '@/assets/B+', id: 2},
    ],
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
    }
  },
  actions: {

  }
})

export default store