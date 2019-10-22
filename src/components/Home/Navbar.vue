<template>
    <div class='navbar'>
        <div class='logo'>
            <img @click="goHome" src='@/assets/logo.png' alt='github logo' /> <!-- TEMP SRC, CHANGE -->
        </div>
        <div class='welcome'>
            <h1>Placeholder Proj Name</h1>
        </div>
        <div class='social'>
                <img id='social-raspberry' @click="handleClick" name='raspberrypi' src=@/assets/raspberrypi.png alt='raspberrypi logo' />
                <img id='social-github' @click="handleClick" name='github' src='@/assets/github.png' alt='github logo' />
                <img id='social-linkedin' @click="handleClick" name='linkedin' src='@/assets/linkedin.png' alt='linkedin logo' />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        name () {
            return this.$store.state.name
        }
    },
    methods: {
        handleClick(event){
            this.$emit('opensocial', event.target.name)
        },
        goHome(){
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="scss">
    .navbar {
        background: #e0e0e0;
        display: flex;
        justify-content: space-between;
        height: 60px;
        border-bottom: 1px solid black;
        border-top: 1px solid black;
        min-width: 300px;

        .welcome {
            justify-self: center;
            align-self: center;
        }

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: height;
            max-width: 60px;
        }

        img {
                height: 60%;
                margin-right: 5px;
            }

        img:hover {
            cursor: pointer;
        }

        .social {
            max-width: 80px;
            padding-right: 10px;
            display: flex;
            align-items: center;
            flex-direction: row;
            margin-right: 30px;
        }
    }
</style>