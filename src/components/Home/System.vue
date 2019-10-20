<template>
    <div class='system'>
        <div class='text-container'><p>{{ system.name }}</p></div>
        <div class='text-container'><p>{{ system.model }}</p></div>
        <div class='text-container'><button>{{this.status}}</button></div>
        <div class='text-container'><button>{{this.water}}</button></div>
        <div class='text-container'><button v-clipboard:copy="this.token">{{this.token}}</button></div>
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
                status: 'offline',
                water: 'false',
                token: '',
                id: this.system.id
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
            fetch(this.$store.state.BASE_URL + '/pi/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({ pi_id: this.id })
            }).then(res => res.json())
              .then(token => this.token = token)

                  this.socket.on('data', data => {
                      console.log(data)
                  })
                  this.socket.on('online', () => {
                      this.status = 'online'
                  })
                  this.socket.on('works', () => {
                      console.log('client connected')
                  })
                  this.socket.on('length', data => {
                      console.log(data)
                  })
                  this.socket.on('room_joined', data => {
                      console.log(data)
                  })
                  this.socket.on('water', data => {
                      data.water == false
                        ? this.water = 'false'
                        : this.water = 'true'
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
                    width: 20%;
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
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    button:focus {
                        display: none;
                    }
                }
            }
</style>