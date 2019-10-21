<template>
    <div>
        <div class='system-title'>
            <h1>Your Pi's</h1>
        </div>
        <div class='systems'>
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
                        <System :system="system" />
                    </div>
                </transition-group>
                <div class='add-pi'><button><img src='@/assets/plus.png' /></button></div>
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
}
</script>

<style lang="scss">
    .container {
        width: 60%;

        .add-pi {
            display: flex;
            justify-content: flex-end;
            min-width: 400px;

            button {
                background-color: transparent;
                min-height: 30px;
                max-width: 55px;
                height: auto;
                margin-top: 10px;
                margin-right: 0;
                border-style: none;
            }

            button img {
                min-height: 30px;
                max-width: 55px;
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
            border: 1px solid #eee;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-bottom: 0;
            background: lightgrey;
            
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