<template>
    <article>
        <div class="container" :class="{'sign-up-active': signUp}">
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Please Enter Your Details</p>
                        <button class='invert' id='signIn' @click='signUp = !signUp'>Sign In</button>
                    </div>
                    <div class="overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Please Enter Your Details</p>
                        <button class='invert' id='signUp' @click='signUp = !signUp'>Sign Up</button>
                    </div>
                </div>
            </div>
            <form class='sign-up' @submit="handleSubmit">
                <h2>Create Login</h2>
                <div>Use Your Email For Registration</div>
                <input type="text" placeholder="Name" name='name' required/>
                <input type="email" placeholder="Email" name='email' required/>
                <input type="password" placeholder="Password" name='password' required/>
                <button>Sign Up</button>
                <img v-if="this.loading" src="@/assets/loading.gif"/>
                <h3 class='success' v-if="this.signup_success">Account Created!</h3>
                <h3 v-if="this.signup_failed">Email Already In Use</h3>
            </form>
            <form class='sign-in' @submit="handleSubmit">
                <h2>Sign In</h2>
                <div>Use Your Email To Sign In</div>
                <input id='signin-email' type="email" placeholder="Email" name='email' required/>
                <input id='signin-password' type="password" placeholder="Password" name='password' required/>
                <button id='signin-button'>Sign In</button>
                <h3 v-if="this.signin_failed">Failed to Sign In</h3>
                <img v-if="this.loading" src="@/assets/loading.gif"/>
            </form>
        </div>
    </article>
</template>


<script>
export default {
        data: () => {
            return {
                signUp: false,
                signin_failed: false,
                signup_failed: false,
                loading: false,
                signup_success: false,
            }
        },
        methods: {
            handleSubmit(event){
                event.preventDefault()
                if (Array.from(event.target.classList).includes('sign-up')){
                    const {name, email, password} = event.target
                    this.handleSignup(name.value, email.value, password.value)
                } else {
                    const {email, password} = event.target
                    this.handleLogin(email.value, password.value)
                }
            },
            handleLogin(email, password) {
                this.signin_failed = false
                this.loading = 'true'
                fetch(this.$store.state.BASE_URL + '/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email, password
                    })
                }).then(res => res.json())
                .then(res => {
                    if (res){
                        window.localStorage.setItem('token', res)
                        this.loading = false
                        this.login()
                    } else {
                        this.loading = false
                        this.signin_failed = true
                    }
                })
                // window.localStorage.setItem('token', 'Bearer token')
                // this.$router.push('/home')
            },
            handleSignup(name, email, password){
                this.signup_failed = false
                this.signup_success = false
                this.loading = 'true'
                fetch(this.$store.state.BASE_URL + '/signup', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name, email, password
                    })
                }).then(res => res.json())
                .then(res => {
                    if (res){  //on success
                        window.localStorage.setItem('token', res)
                        this.loading = false
                        this.signup_success = true
                    } else {  //on fail
                        this.loading = false
                        this.signup_failed = true
                    }
                })
                // window.localStorage.setItem('token', 'Bearer token')
                // this.$router.push('/home')
            },
            login(){
                this.$router.push('home', () => {})
            }
        }
    }
</script>


<style lang='scss'> 

    article {
        .success {
            color: green;
        }
        position: fixed;
        top: 20%;

        .container {

            font-family: ff-tisa-sans-web-pro, sans-serif;
            font-style: normal;
            font-weight: 100;

            position: relative;
            height: 480px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                        0 10px 10px rgba(0, 0, 0, .2);
                        background: linear-gradient(to bottom, #efefef, #ccc);
                        
            .overlay-container {
                position: absolute;
                top: 0;
                left: 50%;
                width: 50%;
                height: 100%;
                overflow: hidden;
                transition: transform .5s ease-in-out;
                z-index: 100;
            }

            .overlay {
                position: relative;
                left: -100%;
                height: 100%;
                width: 200%;
                background: linear-gradient(to bottom right, #7FD625, #009345);
                color: #fff;
                transform: translateX(0);
                transition: transform .5s ease-in-out;
            }

            @mixin overlays($property){
                position: absolute;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-direction: column;
                padding: 70px 40px;
                width: calc(50% - 80px);
                height: calc(100% - 140px);
                text-align: center;
                transform: translateX($property);
                transition: transform .5s ease-in-out;
            }
            .overlay-left {
                @include overlays(0);
                left: 0;
            }

            .overlay-right {
                @include overlays(0);
                right: 0;
            }

            h2 {
                margin: 0;
            }

            p {
                margin: 20px 0 30px;
                font-size: 1.2rem;
            }

            a {
                color: #222;
                text-decoration: none;
                margin: 15px 0;
                font-size: 1rem;
            }

            button {
                border-radius: 20px;
                border: 1px solid #009345;
                background-color: #009345;
                color: #fff;
                font-size: 1rem;
                font-weight: bold;
                padding: 10px 40px;
                letter-spacing: 1px;
                text-transform: uppercase;
                transition: transform .1s ease-in;
    
                &:active {
                    transform: scale(.9);
                }

                &:focus {
                    outline: none;
                }
            }
        }

        button.invert {
            background-color: transparent;
            border-color: #fff;
        }

        form {
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            padding: 90px 60px;
            width: calc(50% - 120px);
            height: calc(100% - 180px);
            text-align: center;
            background: linear-gradient(to bottom, #efefef, #ccc);
            transition: all .5s ease-in-out;
        
            div {
                font-size: 1rem;
            }

            input {
                background-color: #eee;
                border: none;
                padding: 8px 15px;
                margin: 6px 0;
                width: calc(100% - 30px);
                border-radius: 15px;
                border-bottom: 1px solid #ddd;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, .4), 
                    0 -1px 1px #fff, 
                    0 1px 0 #fff;
                overflow: hidden;

                &:focus {
                    outline: none;
                    background-color: #fff;
                }
            }

        }

        h3 {
                color: 	#C50000;
                margin: 0;
            }

        .sign-in {
            left: 0;
            z-index: 2;

            img {
                height: 30px;
            }
        }

        .sign-up {
            left: 0;
            z-index: 1;
            opacity: 0;

            img {
                height: 30px;
            }
        }

        .sign-up-active {
            .sign-in {
                transform: translateX(100%);
            }

            .sign-up {
                transform: translateX(100%);
                opacity: 1;
                z-index: 5;
                animation: show .5s;
            }

            .overlay-container {
                transform: translateX(-100%);
            }

            .overlay {
                transform: translateX(50%);
            }

            .overlay-left {
                transform: translateX(0);
            }

            overlay-right {
                transform: translateX(20%);
            }
        }

        @keyframes show {
            0% {
                opactiy: 0;
                z-index: 1;
            }

            49% {
                opactiy: 0;
                z-index: 1;
            }

            50% {
                opactiy: 1;
                z-index: 10;
            }
        }
    }
    
    @media screen {
        .container {
            width: 900px;
        }
    }

    @media screen and (max-width: 1000px){
        .container {
            width: 800px;
        }
    }

    @media screen and (max-width: 900px){
        .container {
            width: 750px
        }
    }

    @media screen and (max-width: 800px) {
        .container {
            width: 550px;
        }
    }

    @media screen and (max-width: 600px) {
        .container {
            width: 550px;
        }
    }

    @media screen and (max-width: 500px) {
        .container {
            width: 390px;
        }
    }
    @media screen and (max-width: 400px){
        .container {
            width: 320px;
            .sign-in {
                h2 {
                    width: max-content;
                }
                input {
                    width: 200%;;
                }
                div {
                    width: 80px;
                }
            }

            .sign-up {
                h2 {
                    width: max-content;
                }
                input {
                    width: 200%;;
                }
                div {
                    width: 80px;
                }
            }
        }
    }
</style>