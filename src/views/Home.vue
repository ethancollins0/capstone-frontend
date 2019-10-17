<template>
  <div class="home">
    <Navbar v-on:opensocial="openSocial" />
    <div class='home-form'>
      <NewPiForm v-on:addpi="addPi" />
    </div>
  </div>
</template>

<script>

import Navbar from '../components/Home/Navbar'
import NewPiForm from '../components/Home/NewPiForm'

export default {
  name: 'home',
  components: {
    Navbar,
    NewPiForm
  },
  methods: {
    addPi (event) {
      const {description, name, selected} = this.$store.state.form
      fetch(this.$store.state.BASE_URL + '/pi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name, description, selected
        })
      }).then(res => res.json())
      .then(console.log)
    },
    openSocial (name){
      const social = {
        linkedin: 'https://www.linkedin.com/in/ethan-t-collins/',
        raspberrypi: 'https://www.raspberrypi.org/',
        github: 'https://github.com/ethancollins0/capstone-frontend'
      }
      window.open(social[name], '_blank')
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="scss">
  .home {
    .home-form {
      display: flex;
      justify-content: center;
      padding-top: 10%;
    }
  }
</style>
