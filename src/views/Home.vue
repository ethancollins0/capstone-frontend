<template>
  <div class="home">
    <Navbar v-on:opensocial="openSocial" />
    <div>
      <Systems :failed="this.failed" v-on:deletepi="deletePi" v-on:piredirect="piRedirect"/>
    </div>
  </div>
</template>

<script>

import Navbar from '../components/Home/Navbar'
import Systems from '@/components/Home/Systems'

export default {
  name: 'home',
  components: {
    Navbar,
    Systems
  },
  data(){
    return {
      failed: false
    }
  },
  methods: {
    openSocial (name){
      const social = {
        linkedin: 'https://www.linkedin.com/in/ethan-t-collins/',
        raspberrypi: 'https://www.raspberrypi.org/',
        github: 'https://github.com/ethancollins0/capstone-frontend'
      }
      window.open(social[name], '_blank')
    },
    piRedirect(){
      this.$router.push('/pi', () => {})
    },
    deletePi(pi_id){
      fetch(this.$store.state.BASE_URL + '/pi', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          },
          body: JSON.stringify({ pi_id })
      })
      .then(res => res.json())
      .then(result => {
        result
          ? this.$store.commit('deletePi', pi_id)
          : this.failed = true
      })
    }
  }
}
</script>

<style lang="scss">
  .delete-fail {
    color: #C50000;
  }
</style>
