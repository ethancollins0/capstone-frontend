<template>
    <div class='details' @click='handleClick'>
            <h2>{{pi.name}}</h2>
            <img :alt="pi.name" :src="require('@/assets/' + pi.source + '.jpg')"/>
    </div>
</template>


<script>
export default {
    props: {
        pi: {
            type: Object
        },
    },
    methods: {
        getPic(pic){
            return pic
        },
        handleClick(){
            window.open(this.pi.url, '_blank')
        }
    }
}
</script>


<style lang='scss'>
    .details:hover {
        box-shadow: 10px 10px 5px black;
        cursor: pointer;
    }

    .details {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 300px;
        background-color: lightgrey;
        border: 1px solid black;
        margin-bottom: 1rem;
        padding-bottom: 1em;
        border-radius: 5px;
        box-shadow: 4px 4px 5px black;

        

        img {
            display: flex;
            width: 80%;
            height: auto;
            justify-self: center;
            border-radius: 5px;
        }
    }
</style>