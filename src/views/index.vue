<template>
    <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; background: #fff;">
      <img src="../asset/img/a.jpg" />
      <div class="test " style=''></div>
      <img src="./asset/img/b.png" />
    </div>
</template>

<script>

    export default {

        filters: {},
        directives: {},
        components: {








        },
        data () {
            return {

            }
        },
        mounted () {

        },
        beforeDestroy () {


        },
        methods: {

        }
    }
</script>

<style>
    @import '../styles/index.less';
  .test{
    background: url("./asset/img/b.png");
    width: 200px;
    height: 200px;
  }
</style>
