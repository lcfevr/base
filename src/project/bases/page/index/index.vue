<template>
  <div class="container">
    <div class="content">
      <img src="../../../../asset/img/img_1.png" />
      <div class="text">啥家庭啊，{{text}},家里有矿啊？！</div>
    </div>

    <textarea class="text-area" v-model="text"></textarea>
    <button @click="sure">确认</button>
  </div>
</template>

<script>

    import INDEX from '../../../../views/index.vue'
    export default {
        extends:INDEX
    }
</script>
<style lang="less">
  @import '../../../../styles/index.less';
  .container {
    margin: 0 auto;
    width: 300px;
    img {
      width: 100%;
      height: auto;
    }

    .text {
      line-height: 28px;
      font-weight: bold;
      font-size: 22px;
      text-align: center;
    }

    .text-area {
      outline: none;
      box-sizing: border-box;
      width: 100%;
      font-size: 22px;
      font-weight: bold;
      line-height: 28px;
      text-align: center;
      resize: none;
      border: 1px solid #eee;
    }


  }
</style>
