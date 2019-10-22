<template>
        <div class='systems'>
            <div class='error-container'>
                <h3 id='failed-delete' v-if="delete_failed">Failed to Delete Pi</h3>
            </div>
            <div class='container'>
                <div class='header-container'>
                    <div class='text-container'><h3>Name</h3></div>
                    <div class='text-container'><h3>Model</h3></div>
                    <div class='text-container'><h3>Status</h3></div>
                    <div class='text-container'><h3>Needs Watering?</h3></div>
                    <div class='text-container'><h3>Token</h3></div>
                </div>
                <transition-group name='list'>
                    <div class='system-container list-item' v-for="system in systems" v-bind:key="system.id">
                        <System v-on:deletepi="deletePi" :system="system" />
                    </div>
                </transition-group>
                    <div v-if="add_button" class='add-pi'>
                        <button><img @click="handleClick" src='@/assets/plus.png' /></button>
                    </div>
            </div>
        </div>
</template>

<script>
    import System from './System.vue'

    export default {
        props: {
            failed: {
                type: Boolean
            }
        },
        components: {
            System,
        },
        computed: {
                systems () {
                    return this.$store.state.systems
                }
        },
        data(){
            return {
                add_button: false,
                delete_failed: false
            }
        },
        methods: {
            handleClick() {
                this.$emit('piredirect')
            },
            deletePi(id){
                this.$emit('deletepi', id)
            }
        },
        mounted(){
            setTimeout(() => {
                this.add_button = true
            }, 1200)
            this.delete_failed = this.failed
            setTimeout(() => {
                this.delete_failed = false
            }, 3000)
        }
}
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');
    
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;

        border-radius: 5px;

        .text-container {
            overflow: hidden;
        }

        .add-pi {
            display: flex;
            justify-content: flex-end;
            min-width: 400px;

            button {
                display: flex;
                justify-content: center;
                align-content: center;
                border-radius: 100%;
                background-color: transparent;
                min-height: 30px;
                max-height: 55px;
                max-width: 55px;
                height: max-content;
                margin-top: 10px;
                margin-right: 0;
                padding: 0;
                border-style: none;
            }
            
            button:focus {
                cursor: default;
            }

            button img {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                min-height: 30px;
                width: 100%;
                height: 100%;
            }

            button img:hover {
                cursor: pointer;
            }

            button:focus {
                outline: none;
            }

            button img:active {
                box-sizing: border-box;
                box-shadow: 0 3px 0 #00823F;
            }
        }



    }

    .system-title {
        display: flex;
        justify-content: center;
        h1 {
            margin-top: 8%;
            color: white;
        }
    }

    .systems {
        
        .error-container {
            border-radius: 5px;

            h3 {
                color: red;
            }
        }

        padding-top: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .system {
            background-color: #f6f5f3;
        }

        .list-item {
            padding-top: 0;
        }

        .list-enter-active, .list-leave-active {
            transition: all 1s;
        }

        .list-enter, .list-leave-to {
            opacity: 0;
            transform: translateY(30px)
        }

        margin-top: 0;
        width: 100%;
        display: flex;
        justify-content: center;

        .system-container {
            min-width: 400px;
        }

        .system-container:last-child {
            border-bottom: 0;
            box-shadow: 2px 2px 5px black;
        }

        .header-container {
            min-width: 400px;
            margin-bottom: 1px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: 0;
            border-radius: 3px 3px 0 0;

            background: #8c92ac;
            
            .text-container {
                h3 {
                    font-family: 'Candara';
                    color: black
                }

                margin: 10px;
                width: 33%;
                text-align: left;
                // border: 1px solid black;
                height: max-content;
                box-sizing: border-box;
            }
            
        }
    }

    @media screen and (max-width: 480){
        .container {
            width: 400px;
        }
    }
    
    @media screen and (max-width: 600){
        .container {
            width: 500px;
        }
    }
</style>