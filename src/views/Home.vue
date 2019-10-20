<template>
  <div class="home">
    <Navbar v-on:opensocial="openSocial" />
    <div>
      <Systems />
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
  methods: {
    openSocial (name){
      const social = {
        linkedin: 'https://www.linkedin.com/in/ethan-t-collins/',
        raspberrypi: 'https://www.raspberrypi.org/',
        github: 'https://github.com/ethancollins0/capstone-frontend'
      }
      window.open(social[name], '_blank')
    }
  }
}
</script>

<style lang="scss">
</style>
