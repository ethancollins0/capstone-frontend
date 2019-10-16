import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'

Vue.use(Router)

function guard(to, from, next){
  if (window.localStorage.getItem('token')){
    authenticateUser(to, from, next)
  } else {
    next('/login')
  }
}
 
function authenticateUser(to, from, next){
  let url = store.state.BASE_URL
  fetch(url + '/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    },
  }).then(res => res.json())
    .then((res) => {if (res.name && res.email){
      next()
    } else {
      window.localStorage.removeItem('token')
      next('/login')
    }
  })
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      beforeEnter: guard,
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*', 
      redirect: '/login'
    }
  ]
})
