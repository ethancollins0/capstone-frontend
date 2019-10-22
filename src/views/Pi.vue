<template>
    <div class='pi'>
      <Navbar v-on:opensocial="openSocial" />
      <NewPiForm v-on:addpi="addPi" />
      <div class='image-container'>
        <div class='image' v-for="pi in pis" v-bind:key="pi.id">
            <Details :pi="pi" />
        </div>
      </div>
    </div>
</template>

<script>
    import NewPiForm from '../components/Pi/NewPiForm'
    import Navbar from '../components/Home/Navbar'
    import Details from '../components/Pi/Details'

    export default {
        components: {
            NewPiForm,
            Navbar,
            Details
        },
        computed: {
            pis(){
                return this.$store.state.pis
            }
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
                    name, description, model: selected,
                    })
                }).then(res => res.json())
                .then((res) => {
                    console.log(res)
                    typeof res == 'string' ? this.$router.history.push('/home') : console.log('failed')
                })
            },
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
    .pi {
        .pi-form {
            display: flex;
            justify-content: center;
            margin-top: 2%;
        }

        .image-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            margin-left: -20px;

            .image {
                width: 24%;
                display: flex;
                justify-content: center;
            }

            @media screen and (max-width: 900px){
                .image {
                    width: 32%;
                }
            }

            @media screen and (max-width: 600px){
                .image {
                    width: 48%;
                }
            }

            @media screen and (max-width: 400px){
                .image {
                    width: 98%;
                }
            }
        }
    }
</style>

