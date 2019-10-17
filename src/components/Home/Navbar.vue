<template>
    <div class='navbar'>
        <div class='logo'>
            <img src='@/assets/github.png' alt='github logo' /> <!-- TEMP SRC, CHANGE -->
        </div>
        <div class='welcome'>
            <h1>Welcome, {{this.name}}</h1>
        </div>
        <div class='social'>
            <div class='linkedin'>
                <img src='@/assets/github.png' alt='github logo' />
            </div>
            <div class='github'>
                <img src='@/assets/linkedin.png' alt='linkedin logo' />
            </div>
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
    }
}
</script>

<style lang="scss">
    .navbar {
        display: flex;
        justify-content: space-between;
        height: 60px;
        img {
                height: 60%;
                margin: 5px;
            }
        .social {
            display: flex;
            flex-direction: row;
        }
    }
</style>