<template>
    <div class='new-pi-form'>
        <form @submit="handleSubmit" class='pi-form'>
            <h2>Add a New Pi</h2>
            <input type='text' @change="handleChange" name='name' placeholder="name" maxlength='30' required/>
            <div class='model-dropdown'>
                <span class='model-label'>
                    <label for='selected' class='model-label-text'><h3>Model:</h3></label>
                </span>
                <select v-model='selected' @change="handleChange" name='selected'>
                    <option v-for="option in options" v-bind:key='option.id' :value="option.name"> {{ option.name }} </option>
                </select>
            </div>
            <div class='form-bottom'>
                <button class='submit-button'>Create PI</button>
            </div>
            <p>Test</p>
        </form>
    </div>
</template>

<script>
    export default {
        computed: {
            options () {
                return this.$store.state.models
            }
        },
        data () {
            return {
                selected: ""
            }
        },
        methods: {
            handleChange (e) {
                this.$store.commit('piForm', {
                        name: e.target.name,
                        value: e.target.value
                    })
            },
            handleSubmit (e) {
                e.preventDefault()
                this.$emit('addpi')
            }
        },
        mounted () {
            this.selected = 'Raspberry Pi 4 B'
        }
    }
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');
    .new-pi-form {
        display: flex;
        justify-content: center;
        margin-right: 40px;

        .pi-form {
            h2 {
                text-align: center;
                font-family: 'Playfair Display', serif;
                padding-bottom: 10px;
                width: 80%;
                border-bottom: 1px solid black;
            }
            

            .model-dropdown {
                width: 100%;
                display: flex;
                justify-content: center;
                align-content: center;
                height: 50px;
                select {
                    width: 42%;
                    margin-top: 0;
                    margin-left: 20px;
                    height: 80%;
                }

                .model-label {
                    // background-color: #4BB543;
                    height: 80%;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    border-radius: 5px;
                
                    h3 {
                        margin: 10px;
                        
                        margin-left: 0;
                    }
                }
            }

            background: linear-gradient(to bottom, #ebedee, #fdfbfb);
            height: max-content;
            min-height: 300px;
            min-width: 300px;
            border-radius: 5px;
            border: 1px solid black;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            justify-content: space-evenly;
            box-sizing: border-box;
            padding: 5px;
            margin: 0;

            input {
                height: 30px;
                width: 200px;
                margin: 10px;
                padding: 0;
                padding-bottom: 0.4em;
                padding-right: 0.4em;
                font-size: 15px;
            }


            select {
                margin-bottom: 10px;
            }

            .form-bottom {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-content: flex-end;
                justify-content: space-evenly;
                padding-top: 6%;

                .submit-button{
                    width: 40%;
                    height: 40px;
                    background-color: #ffffff;
                    margin-bottom: 0;

                    select {
                        display: none;
                    }
                }

            }


        }
    }
</style>
