<template>
    <div class='login-page'>
        <SignIn />
    </div>
</template>


<script>
    import SignIn from '../components/SignIn'
    export default {
        components: {
            SignIn
        }
    }
</script>


<style lang="scss">
    .login-page {
        display: flex;
        justify-content: center;
    }
</style>

