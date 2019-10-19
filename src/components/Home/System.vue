<template>
    <div class='system'>
        <div class='text-container'><p>{{ system.name }}</p></div>
        <div class='text-container'><p>{{ system.model }}</p></div>
        <div class='text-container'><button>{{this.status}}</button></div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    export default {
        props: {
            system: {
                type: Object
            }
        },
        data(){
            return {
                socket: {},
                status: 'offline'
            }
        },
        created(){
            this.socket = io(this.$store.state.BASE_URL, {
                query: {
                    pi_id: this.system.id,
                    token: `${window.localStorage.getItem('token')}`
                }
            })
        },
        mounted(){
                  this.socket.on('data', data => {
                      console.log(data)
                  })
                  this.socket.on('online', () => {
                      this.status = 'online'
                  })
                  this.socket.on('works', () => {
                      console.log('client connected')
                  })
        }
              
    }
    
</script>

<style lang='scss'>
    .system {
                max-height: 70px;
                background: white;
                min-width: 400px;
                min-height: 50px;
                width: 100%;
                height: max-content;
                // border: 1px solid red;
                border-bottom: 1px solid grey;
                
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-content: center;
                text-align: left;
                box-sizing: border-box;

                .text-container {
                    display: flex;
                    margin: 10px;
                    width: 33%;
                    text-align: left;
                    // border: 1px solid black;
                    height: 50px;
                    align-items: center;
                    min-height: 50px;
                    box-sizing: border-box;

                    button {
                        width: 80%;
                        height: 60%;
                        border-radius: 8px;
                    }

                    button:focus {
                        display: none;
                    }
                }
            }
</style>