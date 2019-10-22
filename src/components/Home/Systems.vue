<template>
    <div>
        <div class='systems'>
            <div class='container'>
                <div class='header-container'>
                    <div class='text-container'><h2>Name</h2></div>
                    <div class='text-container'><h2>Model</h2></div>
                    <div class='text-container'><h2>Status</h2></div>
                    <div class='text-container'><h2>Needs Watering?</h2></div>
                    <div class='text-container'><h2>Token</h2></div>
                </div>
                <transition-group name='list'>
                    <div class='system-container list-item' v-for="system in systems" v-bind:key="system.id">
                        <System v-on:deletepi="deletePi" :system="system" />
                    </div>
                </transition-group>
                    <div v-if="add_button" class='add-pi'><button><img @click="handleClick" src='@/assets/plus.png' /></button></div>
            </div>
        </div>
    </div>
</template>

<script>
    import System from './System.vue'

    export default {
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
                add_button: false
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
        }
}
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');
    
    .container {
        width: 60%;

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
        padding-top: 5%;
        
        .system {
            background-color: #f6f5f3;
        }

        h2 {
            font-family: 'Candara';
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
            border-bottom: 2px solid yellow;
        }

        .header-container {
            min-width: 400px;
            border: 1px solid yellow;
            margin-bottom: 1px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: 0;
            background: #8c92ac;
            
            .text-container {
                margin: 10px;
                width: 33%;
                text-align: left;
                // border: 1px solid black;
                height: max-content;
                box-sizing: border-box;
            }
            
        }
    }
</style>