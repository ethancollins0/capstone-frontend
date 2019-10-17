import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'

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
      if (res && res.user_id && res.email && res.name){
        setUser(res.name)
        return res
      } else {
        window.localStorage.removeItem('token')
        return false
      }
  })
}

function setUser(name){
  console.log(name)
  //dispatch mutation to store
}

function guard(to, from, next){
  if (to.path == '/home'){
    guardHome(to, from, next)
  } else if (to.path == '/login'){
    guardLogin(to, from, next)
  }
}

function guardHome(to, from, next){
  if (window.localStorage.getItem('token')){
    validateToken()
      .then(res => {
        res ? next() : next('/login')
      })
  } else {
    next('/login')
  }
}

function guardLogin(to, from, next){
  console.log('here', 'guard login')
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
      path: '*', 
      redirect: '/login'
    }
  ]
})
