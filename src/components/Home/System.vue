<template>
    <div class='system'>
        <div class='text-container'>
            <h2>{{ system.name }}</h2>
            <img class='delete-icon' @click="this.handleClick" src='@/assets/trash.png' />
        </div>
        <div class='model-info'>
            <div class='text-container pi-image'><h2>{{ system.model }}</h2><img :alt="system.name" :src="require('@/assets/' + this.source + '.jpg')" /></div>
        </div>
        <div class="text-container flat-button"><h2>Status: </h2><button v-bind:class="{ online: this.online, offline: !this.online}">{{this.status}}</button></div>
        <div class='text-container flat-button'><h2>Needs Water: </h2><button v-bind:class="{ water: this.waterBool, dontWater: !this.waterBool }">{{this.water}}</button></div>
        <div class='text-container last-container'><h2>Token: </h2><button v-clipboard:copy="this.token" class='token-button'>{{this.token}}</button></div>
        <div class='watering'>
            <div class='text-container watering-image' v-if="waterBool"><h2>Watering...</h2><img src='@/assets/loading.gif' /></div>
        </div>
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
                waterBool: true,
                pis: this.$store.state.pis,
                models: this.$store.state.models,
                source: '',
                copied: false
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
                let system = this.models.find(model => (model.name == this.system.model))
                let id = 1
                system && typeof system != 'number'
                    ? id = system.id
                    : id = 1
                this.source = this.pis.find(pi => pi.id == id).source   
            },
            beforeDestroy(){
                this.socket.close()
            },
            methods: {
                handleClick(){
                    this.$emit('deletepi', this.system.id)
                },
            }
    }
    
</script>

<style lang='scss'>

    .watering-image {
        img{
            height: 80%;
        }
    }

    .system {
        margin: 10px;
        padding: 20px;
                background: white;
                min-height: 50px;
                width: 400px;
                height: max-content;
                // border: 1px solid red;
                border-bottom: 1px solid grey;
                border-radius: 5px;
                
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                // align-content: space-between;
                text-align: left;
                box-sizing: border-box;

                .watering-image {
                    height: 30px;
                    display: flex;
                    align-self: center;
                }

        .delete-icon {
            height: 70%;
            max-height: 40px;
            padding-bottom: 20px;
        }


        .model-info {
            border-radius: 5px;
            img {
                border-radius: 5px;
            }
        }

        .pi-image {
            img {
                max-height: 100px;
                min-height: 70px; 
                max-width: 50%;
                box-sizing: border-box;
            }
        }


        .text-container:first {
            display: flex;
            justify-content: center;
        }

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
        
               

                .last-container {
                    display: flex;
                    justify-content: space-between;
                }

                .text-container {
                    display: flex;
                    width: 100%;
                    text-align: left;
                    // border: 1px solid black;
                    max-height: 100px;
                    justify-content: space-between;
                    align-items: center;
                    min-height: 50px;
                    box-sizing: border-box;

                    .token-button:hover {
                        cursor: pointer;
                    }

                    img:hover {
                        cursor: pointer;
                    }

                    button {
                        width: 50%;
                        box-sizing: border-box;
                        // min-width: 80%;
                        height: 80%;
                        min-height: 30px;
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

    @media screen and (min-device-width: 320px) and (max-device-width: 480px) {
        .system {
            width: 320px;
        }
    }
</style>