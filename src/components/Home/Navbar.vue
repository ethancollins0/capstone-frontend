<template>
    <div class='navbar'>
        <div class='logo'>
            <img @click="goHome" src='@/assets/logo.png' alt='github logo' /> <!-- TEMP SRC, CHANGE -->
        </div>
        <div class='welcome'>
            <h1>Water.Pi</h1>
        </div>
        <div class='social'>
                <img id='social-github' @click="handleClick" name='github' src='@/assets/github.png' alt='github logo' />
                <img id='social-linkedin' @click="handleClick" name='linkedin' src='@/assets/linkedin.png' alt='linkedin logo' />
                <img id='social-raspberry' @click="handleClick" name='raspberrypi' src=@/assets/raspberrypi.png alt='raspberrypi logo' />
                <img id='logout' src='@/assets/logout.png' @click="logout" />
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
        },
        logout(){
            window.localStorage.removeItem('token')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
    .navbar {
        background: lightgrey;
        display: flex;
        justify-content: space-between;
        height: 60px;
        border-bottom: 1px solid black;
        border-top: 1px solid black;
        min-width: 300px;

        #logout {
            height: 55%;
            margin-left: -5px;
        }

        .welcome {
            display: flex;
            // justify-self: center;
            align-self: center;
            padding-left: 105px;

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
                margin-right: 4px;
            }

        img:hover {
            cursor: pointer;
        }

        .social {
            width: 160px;
            padding-right: 10px;
            display: flex;
            align-items: center;
            flex-direction: row;
        }
    }

    @media screen and (max-width: 450px) {
        .navbar {
            .welcome {
                padding-left: 0;
            }
        }
    }

    @media screen and (max-width: 350px) {
         .navbar {
             width: 300px;
             img {
                 max-height: 30px;
             }
         }

         .social {
             display: flex;
             justify-content: flex-end;
             img {
                 height: 45%;
             }
         }
    }


    @media screen and (max-width: 550) {
        .navbar {
            .welcome {
               margin-left: 50px;
            }
        }
    }
</style>