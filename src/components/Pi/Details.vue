<template>
    <div class='details'>
            <h2>{{pi.name}}</h2>
            <div class='image-container'>
                <img :alt="pi.name" :src="require('@/assets/' + pi.source + '.jpg')"/>
            </div>
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
        }
    }
}
</script>


<style lang='scss'>
    .details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 300px;
        img-container {
            width: 80%;
        }

        img {
            display: flex;
            width: 80%;
            height: auto;
            justify-self: center;
        }
    }
</style>