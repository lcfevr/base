
<style rel="stylesheet/less" lang="less">
    // @import '../styles/common.css';
    @import '../styles/index';

    .page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
<template>
    <div>
        <transition :name="direction"
                    enter-active-class="animated fadeInLeft"
                    leave-active-class="animated fadeOutRight">
            <keep-alive>
                <router-view   class="page"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                direction:'forward'
            }
        },
        mounted () {


        },
        beforeDestroy () {

        },
        methods: {

        },

    }
</script>
