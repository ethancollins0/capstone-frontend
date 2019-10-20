<template>
    <div class='new-pi-form'>
        <form @submit="handleSubmit" class='pi-form'>
            <h2>Add a New Pi</h2>
            <input type='text' @change="handleChange" name='name' placeholder="name" maxlength='30' required/>
            <textarea type='text' @change="handleChange" name='description' placeholder="short description" maxlength='80' required/>
            <div class='form-bottom'>
                <select class='form-style' v-model='selected' @change="handleChange" name='selected'>
                    <option v-for="option in options" v-bind:key='option.id' :value="option.name"> {{ option.name }} </option>
                </select>
                <button class='form-style'>Create PI</button>
            </div>
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
            this.selected = 'A+'
        }
    }
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');
    .new-pi-form {
        display: flex;
        justify-content: center;
        // align-content: center;
        min-height: 300px;

        .pi-form {
            h2 {
                text-align: center;
                font-family: 'Playfair Display', serif;
                padding-bottom: 10px;
                width: 80%;
                border-bottom: 1px solid black;
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

            textarea {
                height: 50px;
                width: 200px;
                margin: 10px;
                padding: 0;
                padding-bottom: 0.4em;
                padding-right: 0.4em;
                resize: none;
                font-size: 15px;
                border: none;
                border-radius: 5px;
                border: 1px solid #eee;
            }

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
                justify-content: space-evenly;

                .form-style {
                    width: 30%;
                    height: 30px;
                    background-color: #ffffff;

                    select {
                        display: none;
                    }
                }

            }


        }
    }
</style>
