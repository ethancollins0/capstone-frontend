<template>
    <div class='system'>
        <div class='text-container'><p>{{ system.name }}</p></div>
        <div class='text-container'><p>{{ system.model }}</p></div>
        <div class="text-container flat-button"><button v-bind:class="{ online: this.online, offline: !this.online}">{{this.status}}</button></div>
        <div class='text-container flat-button'><button v-bind:class="{ water: this.waterBool, dontWater: !this.waterBool }">{{this.water}}</button></div>
        <div class='text-container'><button v-clipboard:copy="this.token">{{this.token}}</button></div>
    </div>
</template>

<script>//
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
                id: this.system.id,
                online: false,
                waterBool: false,
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
                  this.socket.on('online', () => {
                      this.status = 'online'
                  })
                  this.socket.on('length', data => {
                      console.log(data)
                      if (data > 1){
                          this.status = 'online'
                          this.online = true
                      } else {
                          this.status = 'offline'
                          this.online = false
                          this.water = 'false'
                          this.waterBool = false
                      }
                  })
                  this.socket.on('water', data => {
                      if (data.water){
                          this.water = 'true'
                          this.waterBool = true
                      } else {
                          this.water = 'false'
                          this.waterBool = false
                      }
                  })
                  this.socket.on('unit_disconnect', () => {
                      this.socket.emit('get_length', {query: {
                          pi_id: this.system.id
                      }})
                  })
            },
            beforeDestroy(){
                this.socket.close()
            }
    }
    
</script>

<style lang='scss'>
    .system {
        .flat-button button {
            border-style: outset;
        }

        .online {
            background-color: #4BB543;
        }

        .offline {
            background-color: #FF5733;
        }

        .water {
            background-color: #FF5733;
        }

        .dontWater {
            background-color: #4BB543;
        }
        
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
                        min-width: 80%;
                        height: 60%;
                        border-radius: 8px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    button:focus {
                        outline: none;
                    }
                }
            }
</style>