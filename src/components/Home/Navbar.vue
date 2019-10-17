<template>
    <div class='navbar'>
        <div class='logo'>
            <img src='@/assets/github.png' alt='github logo' /> <!-- TEMP SRC, CHANGE -->
        </div>
        <div class='welcome'>
            <h1>Welcome, {{this.name}}</h1>
        </div>
        <div class='social'>
                <img src='@/assets/github.png' alt='github logo' />
                <img src='@/assets/linkedin.png' alt='linkedin logo' />
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
        border-bottom: 1px solid black;
        border-top: 1px solid black;

        .welcome {
            display: flex;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
        }

        img {
                height: 60%;
                margin-right: 5px;
            }

        .social {
            max-width: 80px;
            display: flex;
            align-items: center;
            flex-direction: row;
        }
    }
</style>