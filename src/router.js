import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'
import Pi from './views/Pi.vue'

Vue.use(Router)

function validateToken(){
  let url = store.state.BASE_URL
  return fetch(url + '/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    },
  }).then(res => res.json())
    .then((res) => {
      let user = res.user
      if (res && user.user_id && user.email && user.name){
        store.commit('setName', user.name)
        store.commit('setSystems', res.systems)
        return res
      } else {
        window.localStorage.removeItem('token')
        return false
      }
  })
}

function guard(to, from, next){
  if (to.path == '/home' || to.path == '/pi'){
    guardHome(to, from, next)
  } else if (to.path == '/login'){
    guardLogin(to, from, next)
  }
}

function guardHome(to, from, next){
  if (window.localStorage.getItem('token')){
    validateToken()
      .then(res => {
        res 
          ? next()
          : next('/login')
      })
  } else {
    next('/login')
  }
  next()
}

function guardLogin(to, from, next){
  if (window.localStorage.getItem('token')){
    validateToken()
      .then(res => {
        res ? next('/home') : next()
      })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      beforeEnter: guard,
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      beforeEnter: guard,
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      beforeEnter: guard,
      path: '/pi',
      name: 'pi',
      component: Pi
    },
    {
      path: '*', 
      redirect: '/login'
    }
  ]
})
