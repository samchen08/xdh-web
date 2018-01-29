<template>
  <div class="page-container">
    <div class="app-not-found">
      <img src="../assets/images/404.png">
      <p>:( 很抱歉，您所访问的页面不存在！</p>
      <div>
        <el-button @click="$router.replace('/')">返回首页</el-button>
      </div>
    </div>
    <div class="page-container--cloud"></div>
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../style/vars";

  .page-container {
    height: 100%;
    overflow: hidden;
    background: url(../assets/images/error_bg.jpg) repeat-x scroll 0 0 #67ACE4;
    position: relative;
    min-height: 700px;
  }

  .page-container--cloud {
    background: url(../assets/images/error_cloud.png) repeat-x scroll 0 0 transparent;
    bottom: 0;
    height: 170px;
    position: absolute;
    width: 100%;
  }

  .app-not-found {
    margin: 0 auto;
    padding-top: 50px;
    text-align: center;
    width: 560px;
    p {
      margin: 60px 0;
      font-size: 24px;
      color: $--color-white;
    }
  }
</style>

<script>
  export default {}
</script>
