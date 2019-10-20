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
                <div class='system-container' v-for="system in systems" v-bind:key="system.id">
                    <System :system="system" />
                </div>
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
        margin-top: 0;
        width: 100%;
        display: flex;
        justify-content: center;

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
            border: 1px solid grey;
            
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