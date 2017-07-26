<template>
  <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; background: #fff;">
    <img src="../../../../asset/img/a.jpg" />
    <div class="test " style=''></div>
    <!--<img src="asset/img/b.png" />-->
  </div>
</template>

<script>

    import INDEX from '../../../../views/index.vue'
    export default {
        extends:INDEX
    }
</script>
<style>
  @import '../../../../styles/index.less';
  .test{

    width: 200px;
    height: 200px;
  }
</style>
