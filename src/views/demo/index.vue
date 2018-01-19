<template>
  <div class="system-home">
    <div class="system-home__cover">
      <h1>您好，欢迎使用</h1>
      <h2>单页面后台管理系统！</h2>
    </div>


  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../../style/vars";

  $image-width: 700px;
  $image-height: 338px;
  $title-top: 87px;
  $title-left: 80px;

  .system-home {
    height: 100%;
    &__cover {
      margin: auto;
      width: $image-width;
      height: $image-height;
      @media screen and (min-width: 1280px) {
        width: $image-width * 1.3;
        height: $image-height * 1.3;
      }
      @media screen and (min-width: 1920px) {
        width: $image-width * 1.5;
        height: $image-height * 1.5;
      }
      top: 50%;
      position: relative;
      transform: translate3d(0, -50%, 0);
      background: url('../../assets/images/welcome.png') no-repeat;
      background-size: contain;

    }
    h1 {
      position: absolute;
      color: $--color-black;
      top: $title-top;
      left: $title-left;
      @media screen and (min-width: 1280px) {
        top: 120px;
        left: 162px;
      }
      @media screen and (min-width: 1920px) {
        top: 140px;
        left: 214px;
      }
    }
    h2 {
      color: $--color-info;
      position: absolute;
      top: 150px;
      left: 80px;

      @media screen and (min-width: 1280px) {
        top: 190px;
        left: 162px;
      }
      @media screen and (min-width: 1920px) {
        top: 230px;
        left: 214px;
      }

    }
  }

</style>

<script>
  import XdhAffix from '../../widgets/xdh-affix'

  export default {
    components: {
      XdhAffix
    },
    directives: {},
    data () {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    created () {
    }
  }
</script>
