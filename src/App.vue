<template>
  <div class="app-init">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .app-init {
    height: 100%;
  }
</style>
